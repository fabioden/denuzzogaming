// React Bits — Threads (MIT). https://reactbits.dev  ·  dep: ogl
// Linee morbide animate: qui usate come "tracciato glicemico" calmo sul sito diabete.
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
  vec2 Pi = floor(P);
  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
  Pt += vec2(26.0, 161.0).xyxy;
  Pt *= Pt;
  Pt = Pt.xzxz * Pt.yyww;
  vec4 hash_x = fract(Pt * (1.0 / 951.135664));
  vec4 hash_y = fract(Pt * (1.0 / 642.949883));
  vec4 grad_x = hash_x - 0.49999;
  vec4 grad_y = hash_y - 0.49999;
  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
  grad_results *= 1.4142135623730950;
  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * (3.0 - 2.0 * Pf_Pfmin1.xy);
  vec4 blend2 = vec4(blend, vec2(1.0 - blend));
  return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
  return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
  float split_offset = (perc * 0.4);
  float split_point = 0.1 + split_offset;

  float amplitude_normal = smoothstep(split_point, 0.7, st.x);
  float amplitude_strength = 0.5;
  float finalAmplitude = amplitude_normal * amplitude_strength * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

  float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
  float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

  float xnoise = mix(
    Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
    Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
    st.x * 0.3
  );

  float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

  float line_start = smoothstep(
    y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
    y,
    st.y
  );

  float line_end = smoothstep(
    y,
    y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
    st.y
  );

  return clamp((line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  float line_strength = 1.0;
  for (int i = 0; i < u_line_count; i++) {
    float p = float(i) / float(u_line_count);
    line_strength *= (1.0 - lineFn(
      uv,
      u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
      p,
      (PI * 1.0) * p,
      uMouse,
      iTime,
      uAmplitude,
      uDistance
    ));
  }

  float colorVal = 1.0 - line_strength;
  fragColor = vec4(uColor * colorVal, colorVal);
}
`;

interface ThreadsProps {
  color?: [number, number, number]; // rgb 0-1
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  speed?: number; // moltiplicatore tempo (più basso = più calmo)
}

export default function Threads({
  color = [0.18, 0.62, 0.4],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  speed = 1,
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ color, amplitude, distance, enableMouseInteraction, speed });
  propsRef.current = { color, amplitude, distance, enableMouseInteraction, speed };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uColor: { value: color },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: [0.5, 0.5] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      // Sfondo a tutto schermo: dimensiona sul container, con fallback al viewport
      // (evita race al mount in cui il container misura 0 prima del layout).
      const w = container.clientWidth || window.innerWidth || 1;
      const h = container.clientHeight || window.innerHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
    }
    window.addEventListener("resize", resize);
    resize();
    // ResizeObserver: ridimensiona appena il layout è pronto / cambia.
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    // mouse (opzionale, smorzato)
    const currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];
    function onMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetMouse = [(e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height];
    }
    if (enableMouseInteraction) container.addEventListener("mousemove", onMove);

    let raf = 0;
    function update(t: number) {
      raf = requestAnimationFrame(update);
      const p = propsRef.current;
      if (p.enableMouseInteraction) {
        currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05;
        currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05;
        program.uniforms.uMouse.value = currentMouse;
      } else {
        program.uniforms.uMouse.value = [0.5, 0.5];
      }
      program.uniforms.iTime.value = (t * 0.001) * p.speed;
      program.uniforms.uColor.value = p.color;
      program.uniforms.uAmplitude.value = p.amplitude;
      program.uniforms.uDistance.value = p.distance;
      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      if (enableMouseInteraction) container.removeEventListener("mousemove", onMove);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
