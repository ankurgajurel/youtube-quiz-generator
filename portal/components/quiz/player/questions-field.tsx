import { TQuiz } from "@/@types/TQuiz";
import { TAnswer } from "./quiz-form";
import { cn } from "@/lib/utils";

export default function QuestionsField({
  quiz,
  activeQuestion,
  handleAnswerChange,
  answers,
}: {
  quiz: TQuiz | undefined;
  activeQuestion: number;
  handleAnswerChange: (option: string) => void;
  answers: { question_id: number; answer: string }[];
}) {
  return (
    <div className="grid gap-3">
      {quiz?.questions?.[activeQuestion]?.options?.map((option) => (
        <EachQuestion
          key={option}
          option={option}
          handleAnswerChange={handleAnswerChange}
          answers={answers}
          quiz={quiz}
          activeQuestion={activeQuestion}
        />
      ))}
    </div>
  );
}

export function EachQuestion({
  option,
  handleAnswerChange,
  answers,
  // quiz,
  activeQuestion,
  scored,
  is_correct_answer,
}: {
  handleAnswerChange?: (option: string) => void;
  answers?: TAnswer[];
  activeQuestion?: number;
  quiz?: TQuiz;
  option?: string;
  is_correct_answer?: boolean;
  scored?: () => 1 | 0 | undefined;
}) {
  return (
    <div
      key={option}
      onClick={() => handleAnswerChange && option && handleAnswerChange(option)}
      className={cn(
        "flex gap-3 items-center px-3 py-3 border rounded-xl border-black",
        scored && scored() === 1 && "bg-green-400 border-green-600 border-2",
        scored && scored() === 0 && "bg-red-400 border-red-600 border-2",
        is_correct_answer === undefined &&
          "hover:bg-black transition-colors duration-200 hover:text-white cursor-pointer",
        is_correct_answer === true && "bg-green-400  border-green-600 border-2",
        answers &&
          activeQuestion !== undefined &&
          answers[activeQuestion]?.answer === option &&
          "bg-black text-white"
      )}
    >
      <input
        className="w-4 h-4"
        type="radio"
        id={option + "-option"}
        checked={
          is_correct_answer === true ||
          (answers &&
            activeQuestion !== undefined &&
            answers[activeQuestion]?.answer === option)
        }
        onChange={() =>
          handleAnswerChange && option && handleAnswerChange(option)
        }
      />
      <label className="font-medium" htmlFor={option + "-option"}>
        {option}
      </label>
    </div>
  );
}
