import { BookmarkPlus, CheckCircle2, Play } from "lucide-react";
import type { Lesson } from "../types";
import ImageWithAttribution from "./ImageWithAttribution";

type LessonCardProps = {
  lesson: Lesson;
  completed: boolean;
  reviewed: boolean;
  onComplete: (lessonId: string) => void;
  onReview: (lessonId: string) => void;
  onTest: (lesson: Lesson) => void;
};

const LessonCard = ({ lesson, completed, reviewed, onComplete, onReview, onTest }: LessonCardProps) => (
  <article className="glass rounded-lg">
    <ImageWithAttribution source={lesson.imageSource} title={lesson.title} />
    <div className="space-y-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-bold">{lesson.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{lesson.summary}</p>
        </div>
        <span className="rounded bg-amber/15 px-2 py-1 text-xs font-semibold text-amber">D{lesson.difficulty}</span>
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">What to notice</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {lesson.lookFor.slice(0, 4).map((item) => (
            <div key={item} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded border border-coral/20 bg-coral/10 p-3 text-sm text-slate-300">
        <span className="font-semibold text-coral">Common mistake:</span> {lesson.commonConfusion}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => onTest(lesson)} className="inline-flex items-center gap-2 rounded bg-signal px-3 py-2 text-sm font-bold text-night">
          <Play size={16} /> Test me
        </button>
        <button type="button" onClick={() => onReview(lesson.id)} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm text-slate-200">
          <BookmarkPlus size={16} /> {reviewed ? "In review" : "Add review"}
        </button>
        <button type="button" onClick={() => onComplete(lesson.id)} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm text-slate-200">
          <CheckCircle2 size={16} /> {completed ? "Learned" : "Mark learned"}
        </button>
      </div>
    </div>
  </article>
);

export default LessonCard;
