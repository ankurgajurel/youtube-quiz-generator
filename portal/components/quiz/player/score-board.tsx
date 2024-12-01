import { TQuiz } from "@/@types/TQuiz";
import clsx from "clsx";
import { MoveRight } from "lucide-react";

export default function ScoreBoard({
  score,
  quiz,
  reloadQuiz,
}: {
  score: number;
  quiz: TQuiz | undefined;
  reloadQuiz: () => void;
}) {
  return (
    <div className="h-[450px] max-w-xl w-full mx-auto border border-black flex items-center justify-center flex-col gap-3 p-10 rounded-3xl">
      <h1 className="text-3xl tracking-tight font-bold">Score</h1>

      <p
        className={clsx(
          "text-8xl font-extrabold flex-1 flex items-center justify-center",
          score > (quiz?.questions?.length ?? 0) * 0.7
            ? "text-green-500"
            : score > (quiz?.questions?.length ?? 0) * 0.4
            ? "text-yellow-500"
            : "text-red-500"
        )}
      >
        {score}/{quiz?.questions?.length}
      </p>

      <button
        onClick={reloadQuiz}
        className="bg-black hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center"
      >
        <span className="font-bold">Try Again</span>
        <MoveRight />
      </button>
    </div>
  );
}
