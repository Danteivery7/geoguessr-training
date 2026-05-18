import { CheckCircle2, XCircle } from "lucide-react";
import type { Question, QuizResponse } from "../types";
import ImageWithAttribution from "./ImageWithAttribution";

type QuestionCardProps = {
  question: Question;
  response?: QuizResponse;
  onAnswer: (answerId: string) => void;
  onNext: () => void;
  index: number;
  total: number;
};

const QuestionCard = ({ question, response, onAnswer, onNext, index, total }: QuestionCardProps) => {
  const answered = Boolean(response);

  return (
    <div className="glass rounded-lg p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Question {index + 1} / {total}
        </div>
        <div className="rounded bg-white/10 px-2 py-1 text-xs text-slate-300">D{question.difficulty}</div>
      </div>
      {question.imageSource ? <ImageWithAttribution source={question.imageSource} title={question.prompt} className="mb-5" /> : null}
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{question.prompt}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.answers.map((answer) => {
          const isSelected = response?.selectedAnswer === answer.id;
          const isCorrect = question.correctAnswer === answer.id;
          const stateClass = !answered
            ? "border-white/10 bg-white/[0.04] hover:border-signal/50"
            : isCorrect
              ? "border-signal/50 bg-signal/15"
              : isSelected
                ? "border-coral/50 bg-coral/15"
                : "border-white/10 bg-white/[0.03] opacity-60";

          return (
            <button
              type="button"
              key={answer.id}
              disabled={answered}
              onClick={() => onAnswer(answer.id)}
              className={`flex min-h-[66px] items-center justify-between rounded-lg border px-4 py-3 text-left ${stateClass}`}
            >
              <span className="font-semibold">{answer.label}</span>
              {answered && isCorrect ? <CheckCircle2 className="text-signal" size={20} /> : null}
              {answered && isSelected && !isCorrect ? <XCircle className="text-coral" size={20} /> : null}
            </button>
          );
        })}
      </div>
      {answered ? (
        <div className="mt-5 rounded-lg border border-white/10 bg-night/60 p-4">
          <div className="text-sm font-bold text-signal">Correct answer: {question.correctAnswer}</div>
          <div className="mt-2 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
            <div>
              <span className="text-slate-500">Giveaway</span>
              <p>{question.giveaway}</p>
            </div>
            <div>
              <span className="text-slate-500">Tempting trap</span>
              <p>{question.commonMistake}</p>
            </div>
            <div>
              <span className="text-slate-500">Remember</span>
              <p>{question.explanation}</p>
            </div>
          </div>
          <button type="button" onClick={onNext} className="mt-4 rounded bg-signal px-4 py-2 font-bold text-night">
            {index + 1 >= total ? "Finish test" : "Next clue"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
