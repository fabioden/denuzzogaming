import { useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { courses } from "@/content/membership";
import { wrap, LockIcon, VideoPlayer } from "@/components/academy";
import { useProgress } from "@/hooks/useProgress";
import { toggleLesson } from "@/lib/progress";
import { useDashboardData, bumpStreak } from "@/hooks/useDashboardData";
import type { MemberContext } from "@/components/MemberLayout";

export default function CourseDetail() {
  const { id } = useParams();
  const { isActive } = useOutletContext<MemberContext>();
  const completed = useProgress();
  const { data, update } = useDashboardData();
  const course = courses.find((c) => c.id === id);
  const [active, setActive] = useState(0);

  if (!course) {
    return (
      <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
        <div className={wrap}>
          <p className="text-ink-2">
            Corso non trovato.{" "}
            <Link to="/account" className="text-gold">Torna ai tuoi corsi</Link>
          </p>
        </div>
      </section>
    );
  }

  const lesson = course.lessons[active];
  const lessonLocked = !isActive && !lesson.free;

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <Link to="/account" className="text-ink-2 text-[.9rem] hover:text-gold transition-colors">← I miei corsi</Link>
        <span className="section-label mt-4 block">{course.category} · {course.level}</span>
        <h1 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] text-ink mt-1 mb-2">{course.title}</h1>
        <p className="lead text-ink-2 max-w-[60ch] mb-7">{course.subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6">
          {/* PLAYER */}
          <div>
            <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} locked={lessonLocked} />
            <h2 className="font-display text-[1.3rem] text-ink mt-4">{lesson.title}</h2>
            <p className="text-muted text-[.9rem] mt-1">
              {lesson.durationMin} min{lesson.free ? " · Anteprima gratis" : ""}
            </p>
            {!lessonLocked && (
              <button
                onClick={() => { const done = !completed.has(lesson.id); toggleLesson(lesson.id, done); if (done) update({ streak: bumpStreak(data.streak) }); }}
                className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[.93rem] transition-colors ${completed.has(lesson.id) ? "border-gold/50 bg-gold/[.10] text-gold" : "border-line-2 text-ink-2 hover:border-gold/40 hover:text-ink"}`}
              >
                <span aria-hidden>{completed.has(lesson.id) ? "✓" : "○"}</span>
                {completed.has(lesson.id) ? "Completato" : "Segna come completato"}
              </button>
            )}
          </div>

          {/* ELENCO LEZIONI */}
          <div>
            <span className="section-label">Gli esercizi</span>
            <div className="flex flex-col gap-2 mt-3">
              {course.lessons.map((l, i) => {
                const locked = !isActive && !l.free;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActive(i)}
                    className={`text-left rounded-[10px] border px-3 py-2.5 transition-colors ${i === active ? "border-gold bg-card" : "border-line-2 hover:bg-card"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[.86rem] w-4 shrink-0 ${completed.has(l.id) ? "text-gold" : "text-muted"}`}>{completed.has(l.id) ? "✓" : i + 1}</span>
                      <span className="text-ink text-[.97rem] flex-1 leading-snug">{l.title}</span>
                      {locked ? (
                        <span className="text-gold shrink-0"><LockIcon size={14} /></span>
                      ) : l.free ? (
                        <span className="text-[11px] font-semibold text-gold-contrast bg-gold px-1.5 py-0.5 rounded-full shrink-0">gratis</span>
                      ) : null}
                    </div>
                    <p className="text-muted text-[.8rem] mt-1 ml-[26px]">{l.durationMin} min</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
