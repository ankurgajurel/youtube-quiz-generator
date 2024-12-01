import Timer from "./timer";
import { TAnswer } from "./quiz-form";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";

export default function QuizTracker({
  totalQuestions,
  answers,
  activeQuestion,
  unAnsweredQuestions,
  quiz_timer,
  handleActiveQuestionChange,
  isSubmitActive,
  setIsSubmitActive,
}: {
  totalQuestions: number | number;
  activeQuestion: number;
  answers: TAnswer[];
  unAnsweredQuestions: number[];
  quiz_timer?: number;
  handleActiveQuestionChange: ({
    direction,
    jumpIndex,
  }: {
    direction?: "next" | "prev";
    jumpIndex?: number;
  }) => void;
  isSubmitActive: boolean;
  setIsSubmitActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="border h-full w-full border-black rounded-xl p-5 flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <button
          type="button"
          onClick={() => setIsSubmitActive(true)}
          disabled={activeQuestion === 0}
          className="bg-black h-fit w-1/2 md:w-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
        >
          <MoveLeft />
          <span className="font-bold">Start Quiz</span>
        </button>
        {quiz_timer && (
          <Timer
            isTimerActive={isSubmitActive}
            setIsTimerActive={setIsSubmitActive}
            totalTime={quiz_timer}
          />
        )}
      </div>
      <div className="flex gap-5 justify-between">
        {[...Array(totalQuestions)].map((eachQn, index) => (
          <div
            onClick={() => {
              handleActiveQuestionChange({ jumpIndex: index });
            }}
            className={cn(
              "p-3 rounded-full text-center cursor-pointer hover:bg-opacity-90 w-full",
              unAnsweredQuestions.includes(index) && "bg-yellow-300 text-black",
              answers[index].answer !== "" && "bg-green-500 text-white",
              activeQuestion === index &&
                "shadow-md ring-1 ring-offset-transparent ring-blue-400 scale-[115%] transition-transform duration-200 ring-offset-2 bg-blue-400 text-white"
            )}
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
