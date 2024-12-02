import Timer from "./timer";
import { TAnswer } from "./quiz-form";
import { cn } from "@/lib/utils";

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
    <div className="border h-full w-full border-black rounded-xl p-5 flex gap-8 items-center">
      <div className="flex gap-5 items-center min-w-fit">
        <button
          type="button"
          onClick={() => setIsSubmitActive((prev) => !prev && true)}
          disabled={isSubmitActive}
          className="bg-black h-fit w-1/2 md:w-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
        >
          <span className="font-bold">{isSubmitActive ? "Started" : "Start Quiz"}</span>
        </button>
        {quiz_timer && (
          <Timer
            isTimerActive={isSubmitActive}
            setIsTimerActive={setIsSubmitActive}
            totalTime={quiz_timer}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {[...Array(totalQuestions)].map((eachQn, index) => (
          <div
            onClick={() => {
              handleActiveQuestionChange({ jumpIndex: index });
            }}
            className={cn(
              "p-3 rounded-full text-center cursor-pointer hover:bg-opacity-90 h-10 w-10 flex items-center justify-center",
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
