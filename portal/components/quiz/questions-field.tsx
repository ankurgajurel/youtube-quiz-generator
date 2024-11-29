import { TQuiz } from "@/@types/TQuiz";
import clsx from "clsx";

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
        <div
          key={option}
          onClick={() => handleAnswerChange(option)}
          className={clsx(
            "flex gap-3 items-center px-3 py-3 border rounded-xl border-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer",
            answers.find(
              (ans) =>
                ans.question_id ===
                  quiz?.questions?.[activeQuestion]?.question_id &&
                ans.answer === option
            ) !== undefined && "bg-black text-white"
          )}
        >
          <input
            className="w-4 h-4"
            type="radio"
            id={option + "-option"}
            checked={
              answers.find(
                (ans) =>
                  ans.question_id ===
                    quiz?.questions?.[activeQuestion]?.question_id &&
                  ans.answer === option
              ) !== undefined
            }
            onChange={() => handleAnswerChange(option)}
          />
          <label className="font-medium" htmlFor={option + "-option"}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
