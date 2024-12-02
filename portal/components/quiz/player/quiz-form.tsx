"use client";

import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

import QuestionsField from "./questions-field";
import { TQuiz } from "@/@types/TQuiz";
import QuizTracker from "./quiz-tracker";
import { useFormStatus } from "react-dom";
import Spinner from "@/components/common/spinner";

export type TAnswer = {
  question_id: number;
  answer: string;
};

const initialAnswers = (quiz: TQuiz | undefined) => {
  return (
    quiz?.questions?.map((question) => ({
      question_id: question.question_id,
      answer: "",
    })) ?? []
  );
};

export default function QuizForm({
  quiz,
  submitQuizAction,
}: {
  quiz: TQuiz | undefined;
  submitQuizAction: (answers: TAnswer[]) => void;
}) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState<number[]>([]);
  const [answers, setAnswers] = useState(initialAnswers(quiz));
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { pending } = useFormStatus();

  const handleAnswerChange = (option: string) => {
    if (!isSubmitActive) {
      toast("You've not started the quiz yet.");
      return;
    }

    const updatedAnswers = answers.map((answer, index) =>
      index === activeQuestion
        ? { question_id: answer.question_id, answer: option }
        : answer
    );

    if (unAnsweredQuestions.includes(activeQuestion)) {
      setUnAnsweredQuestions((prev) =>
        prev.filter((qn) => qn !== activeQuestion)
      );
    }

    setAnswers(updatedAnswers);
  };

  const handleActiveQuestionChange = ({
    direction,
    jumpIndex,
  }: {
    direction?: "next" | "prev";
    jumpIndex?: number | null;
  }) => {
    if (!isSubmitActive) {
      toast("You've not started the quiz yet.");
      return;
    }

    if (
      answers[activeQuestion].answer === "" &&
      !unAnsweredQuestions.includes(activeQuestion)
    ) {
      setUnAnsweredQuestions((prev) => [...prev, activeQuestion]);
    }

    if (jumpIndex !== null && jumpIndex !== undefined && jumpIndex >= 0) {
      setUnAnsweredQuestions((prev) => [
        ...prev,
        ...Array.from({ length: jumpIndex }, (_, i) => i).filter(
          (index) => !unAnsweredQuestions.includes(index)
        ),
      ]);
      setActiveQuestion(jumpIndex);
      return;
    }

    if (
      direction === "next" &&
      quiz?.questions &&
      activeQuestion + 1 < quiz.questions.length
    ) {
      setActiveQuestion((prev) => prev + 1);
    }
    if (direction === "prev" && activeQuestion > 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <QuizTracker
        quiz_timer={quiz?.quiz_timer}
        answers={answers}
        activeQuestion={activeQuestion}
        totalQuestions={quiz?.questions?.length ?? 0}
        unAnsweredQuestions={unAnsweredQuestions}
        handleActiveQuestionChange={handleActiveQuestionChange}
        isSubmitActive={isSubmitActive}
        setIsSubmitActive={setIsSubmitActive}
      />
      <form
        action={() => submitQuizAction(answers)}
        className="flex-1 my-auto w-full min-w-xl mx-auto grid gap-5 col-span-2"
      >
        <div className="grid gap-3 border w-full border-black rounded-xl mx-auto p-5 min-h-[500px] place-items-stretch">
          <div className="flex justify-between items-start">
            <span className="font-bold">
              {activeQuestion + 1} / {quiz?.questions?.length}
            </span>
          </div>
          <div className="text-xl tracking-tight font-bold">
            {quiz?.questions?.[activeQuestion]?.question_text}
          </div>

          <QuestionsField
            quiz={quiz}
            activeQuestion={activeQuestion}
            handleAnswerChange={handleAnswerChange}
            answers={answers}
          />

          <div className="flex flex-col md:flex-row w-full justify-between md:items-end gap-5">
            <button
              type="button"
              onClick={() => handleActiveQuestionChange({ direction: "prev" })}
              disabled={activeQuestion === 0}
              className="bg-black h-fit w-1/2 md:w-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
            >
              <MoveLeft />
              <span className="font-bold">Previous</span>
            </button>
            <button
              type="button"
              disabled={
                activeQuestion + 1 === (quiz?.questions?.length ?? 0) ||
                !isSubmitActive
              }
              onClick={() => handleActiveQuestionChange({ direction: "next" })}
              className="bg-black h-fit w-1/2 md:w-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
            >
              <span className="font-bold">Next</span>

              <MoveRight />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isSubmitActive}
            className={clsx(
              "w-fit bg-black hover:bg-opacity-70 transition-colors duration-200 h-fit text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
            )}
          >
            <span className="font-bold">Submit</span>

            {/* {pending ? <Spinner /> : <MoveRight />} */}
            {pending ? "hello" : "fuckme"}
          </button>
        </div>
      </form>
    </div>
  );
}
