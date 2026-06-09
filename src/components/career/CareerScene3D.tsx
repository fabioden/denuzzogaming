import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Environment, Lightformer, Text, Bounds } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";
import { career } from "@/content";
import { useContent } from "@/content/use-content";

type Item = (typeof career)[number];

function Card({ data, x, rotY }: { data: Item; x: number; rotY: number }) {
  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.35}>
      <group position={[x, 0, 0]} rotation={[0, rotY, 0]}>
        <RoundedBox args={[1.18, 1.64, 0.06]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#171206" metalness={0.82} roughness={0.3} />
        </RoundedBox>
        {/* sottile cornice oro */}
        <RoundedBox args={[1.08, 1.54, 0.062]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#2a2008" metalness={0.95} roughness={0.22} />
        </RoundedBox>
        <Text position={[0, 0.5, 0.04]} fontSize={0.27} color="#e6b43c" anchorX="center" anchorY="middle">
          {data.year}
        </Text>
        <Text position={[0, 0.2, 0.04]} fontSize={0.07} color="#9b8a55" letterSpacing={0.18} anchorX="center" anchorY="middle">
          {data.type.toUpperCase()}
        </Text>
        <Text position={[0, -0.34, 0.04]} fontSize={0.105} color="#ffffff" maxWidth={1.0} textAlign="center" anchorX="center" anchorY="middle">
          {data.title}
        </Text>
        <Text position={[0, -0.6, 0.04]} fontSize={0.068} color="#8a8a99" anchorX="center" anchorY="middle">
          {data.sub}
        </Text>
      </group>
    </Float>
  );
}

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const ty = state.pointer.x * 0.35;
    const tx = -state.pointer.y * 0.18;
    ref.current.rotation.y += (ty - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (tx - ref.current.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export default function CareerScene3D() {
  const { career } = useContent();
  const n = career.length;
  const mid = (n - 1) / 2;
  const step = 1.34;
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 30 }} gl={{ antialias: true, alpha: true }} style={{ width: "100%", height: "100%" }} resize={{ debounce: 0 }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} color="#e6b43c" position={[0, 3, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1} color="#ffffff" position={[-5, 0, 3]} scale={[3, 4, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#7a5a10" position={[5, -1, 3]} scale={[3, 4, 1]} />
      </Environment>
      <Bounds fit clip margin={1.06}>
        <Rig>
          {career.map((c, i) => (
            <Card key={c.year + c.title} data={c} x={(i - mid) * step} rotY={(i - mid) * -0.06} />
          ))}
        </Rig>
      </Bounds>
    </Canvas>
  );
}
