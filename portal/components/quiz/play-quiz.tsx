"use client";

import useSWR from "swr";
import { axiosInstance } from "@/lib/axios";
import { TQuiz } from "@/@types/TQuiz";
import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import QuestionsField from "./questions-field";
import validateQuizAnswers from "@/app/api/public/quiz/validate-answers";
import Spinner from "../common/spinner";
import clsx from "clsx";

export default function PlayQuiz({ quizId }: { quizId: string }) {
  const { data, isLoading } = useSWR<{ data: TQuiz }>(
    `/quiz/${quizId}`,
    axiosInstance
  );

  const [answers, setAnswers] = useState<
    { question_id: number; answer: string }[]
  >([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState<null | number>(null);

  const quiz = data?.data;

  if (isLoading)
    return (
      <div className="h-[60vh] w-[100vw] mx-auto my-auto flex items-center justify-center">
        <Spinner />
      </div>
    );

  const handleAnswerChange = (option: string) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (ans) =>
        ans.question_id === quiz?.questions?.[activeQuestion]?.question_id
    );

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = {
        question_id: quiz?.questions?.[activeQuestion]?.question_id ?? 0,
        answer: option,
      };
    } else {
      updatedAnswers.push({
        question_id: quiz?.questions?.[activeQuestion]?.question_id ?? 0,
        answer: option,
      });
    }

    setAnswers(updatedAnswers);
  };

  const handleActiveQuestionChange = (direction: "next" | "prev") => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeQuestion + 1 !== (quiz?.questions?.length ?? 0)) return;

    const response = await validateQuizAnswers(answers);

    console.log(response.score);

    setScore(response.score);
  };

  return (
    <main className="max-w-5xl mx-auto py-10 flex flex-col space-y-10 px-10">
      <div className="grid gap-3">
        <h1 className="text-3xl font-bold">{quiz?.name}</h1>
        <p>{quiz?.description}</p>
      </div>
      {score !== null ? (
        <ScoreBoard
          score={score}
          quiz={quiz}
          reloadQuiz={() => {
            setActiveQuestion(0);
            setScore(null);
            setAnswers([]);
          }}
        />
      ) : (
        <QuizForm
          quiz={quiz}
          activeQuestion={activeQuestion}
          handleAnswerChange={handleAnswerChange}
          answers={answers}
          handleActiveQuestionChange={handleActiveQuestionChange}
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

function ScoreBoard({
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

function QuizForm({
  quiz,
  activeQuestion,
  handleAnswerChange,
  answers,
  handleActiveQuestionChange,
  handleSubmit,
}: {
  quiz: TQuiz | undefined;
  activeQuestion: number;
  handleAnswerChange: (option: string) => void;
  answers: { question_id: number; answer: string }[];
  handleActiveQuestionChange: (direction: "next" | "prev") => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      onSubmit={
        !isSubmitting
          ? async (e) => {
              setIsSubmitting(true);
              await handleSubmit(e);
              setIsSubmitting(false);
            }
          : undefined
      }
      className="flex-1 my-auto max-w-xl mx-auto grid gap-5"
    >
      <div className="grid gap-3 border w-[36rem] border-black rounded-xl mx-auto p-5 h-[450px] place-items-stretch">
        <div className="flex justify-end">
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

        <div className="flex w-full justify-between items-end gap-5">
          <button
            type="button"
            onClick={() => handleActiveQuestionChange("prev")}
            disabled={activeQuestion === 0}
            className="bg-black h-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
          >
            <MoveLeft />
            <span className="font-bold">Previous</span>
          </button>
          <button
            type="button"
            disabled={activeQuestion + 1 === (quiz?.questions?.length ?? 0)}
            onClick={() => handleActiveQuestionChange("next")}
            className="bg-black h-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
          >
            <span className="font-bold">Next</span>
            <MoveRight />
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            activeQuestion + 1 < (quiz?.questions?.length ?? 0) || isSubmitting
          }
          className={clsx(
            "w-fit bg-black hover:bg-opacity-70 transition-colors duration-200 h-fit text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
          )}
        >
          <span className="font-bold">Submit</span>
          <MoveRight />
        </button>
      </div>
    </form>
  );
}
