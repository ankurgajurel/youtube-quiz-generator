"use client";

import { TQuiz, TQuizReponse } from "@/@types/TQuiz";
import clsx from "clsx";
import { MoveRight } from "lucide-react";
import { redirect } from "next/navigation";
import ScoredCorrectQuestions from "./scored-correct-questions";
import { useFormStatus } from "react-dom";
import Spinner from "@/components/common/spinner";

export type THelperQuizResponses = {
  id: number;
  question_text: string;
  user_answer: string;
  correct_answer: string;
  scored: boolean;
  options: string[];
}[];

export default function ScoreBoard({
  quiz,
  quizResponses,
}: {
  quiz: TQuiz;
  quizResponses: TQuizReponse;
}) {
  const colorSchemer = () => {
    const answers: THelperQuizResponses = [];

    if (!quiz.questions) return;

    quiz.questions.forEach((question, index) => {
      const correctAnswerObject =
        quizResponses?.wrong_answers.find(
          (answer) => answer.question_id === question.question_id
        ) ||
        quizResponses.scored_answers.find(
          (answer) => answer.question_id === question.question_id
        );

      if (!correctAnswerObject) return;
      answers.push({
        id: index,
        question_text: question.question_text,
        user_answer: correctAnswerObject.answer,
        correct_answer:
          correctAnswerObject.correct_answer ?? correctAnswerObject.answer,
        scored: false,
        options: question.options,
      });
    });

    return answers;
  };

  const displayHelperAnswers = colorSchemer();

  return (
    <div className="max-w-5xl mx-auto">
      <ScoredCorrectQuestions
        quiz={quiz}
        helperQuizResponses={displayHelperAnswers}
        score={quizResponses.score}
      />
    </div>
  );
}

export function ActualScore({
  quiz,
  score,
  quiz_id,
}: {
  quiz: TQuiz;
  score: number;
  quiz_id: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="max-w-xl w-full mx-auto border border-black flex items-center justify-center flex-col gap-10 p-5 rounded-3xl">
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
        onClick={() => redirect(`/quiz/${quiz_id}`)}
        className="bg-black hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center"
      >
        <span className="font-bold">Try Again</span>
        {pending ? <Spinner className="w-5 h-5" /> : <MoveRight />}
      </button>
    </div>
  );
}
