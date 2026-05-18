import type { Question } from "../types";
import { useQuiz } from "../hooks/useQuiz";
import QuestionCard from "./QuestionCard";

type QuizEngineProps = {
  profileId: string;
  quizId: string;
  title: string;
  questions: Question[];
  onClose?: () => void;
};

const QuizEngine = ({ profileId, quizId, title, questions, onClose }: QuizEngineProps) => {
  const quiz = useQuiz(profileId, quizId, title, questions);
  const response = quiz.currentQuestion
    ? quiz.responses.find((item) => item.questionId === quiz.currentQuestion.id)
    : undefined;

  if (!questions.length) {
    return (
      <div className="glass rounded-lg p-6">
        <h2 className="font-display text-3xl font-bold">No questions found</h2>
        <p className="mt-2 text-slate-400">Try a broader filter or add custom questions in Asset Manager.</p>
      </div>
    );
  }

  if (quiz.isFinished || !quiz.currentQuestion) {
    return (
      <div className="glass rounded-lg p-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-signal/15 text-3xl font-black text-signal">
          {quiz.summary.accuracy}%
        </div>
        <h2 className="font-display text-4xl font-bold">{title} complete</h2>
        <p className="mt-2 text-slate-400">
          {quiz.summary.correct} correct out of {quiz.summary.total}. Mistakes were sent to your review queue.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={quiz.reset} className="rounded border border-white/10 px-4 py-2 text-slate-200">
            Run again
          </button>
          {onClose ? (
            <button type="button" onClick={onClose} className="rounded bg-signal px-4 py-2 font-bold text-night">
              Back to training
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Active test</div>
        <h1 className="font-display text-4xl font-bold">{title}</h1>
      </div>
      <QuestionCard
        question={quiz.currentQuestion}
        response={response}
        onAnswer={quiz.answer}
        onNext={quiz.next}
        index={quiz.index}
        total={questions.length}
      />
    </section>
  );
};

export default QuizEngine;
