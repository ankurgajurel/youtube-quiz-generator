"use client";

import { TQuiz } from "@/@types/TQuiz";
import { useState } from "react";
import { EachQuestion } from "../questions-field";
import { ActualScore, THelperQuizResponses } from "./score-board";
import { MoveLeft, MoveRight } from "lucide-react";
import Badge from "@/components/ui/badge";
import ScoreBoardQuestionsIndex from "./score-board-questions-index";

export default function ScoredCorrectQuestions({
  quiz,
  helperQuizResponses,
  score,
}: {
  quiz: TQuiz;
  helperQuizResponses: THelperQuizResponses | undefined;
  score: number;
}) {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  const handleActiveQuestionChange = ({
    direction,
    jumpIndex,
  }: {
    direction?: "next" | "prev";
    jumpIndex?: number | null;
  }) => {
    if (jumpIndex !== null && jumpIndex !== undefined && jumpIndex >= 0) {
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

  if (!helperQuizResponses) return;

  const getBadgeVariant = () => {
    if (!helperQuizResponses[activeQuestion].user_answer) return "warning";

    if (
      helperQuizResponses[activeQuestion].correct_answer ===
      helperQuizResponses[activeQuestion].user_answer
    ) {
      return "success";
    }

    return "error";
  };

  return (
    <div className="grid grid-cols-2 gap-5 w-full">
      <div className="grid gap-5">
        <ScoreBoardQuestionsIndex
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          displayHelperAnswers={helperQuizResponses}
        />
        hi{`${quiz.id}`}
        <ActualScore score={score} quiz={quiz} quiz_id={`${quiz.id}`} />
      </div>
      <div className="grid gap-3 border border-black p-5 rounded-xl min-h-[530px]">
        <h1 className="text-xl tracking-tight font-bold">
          {quiz?.questions?.[activeQuestion].question_text}
        </h1>
        <Badge variant={getBadgeVariant()}>
          {getBadgeVariant() === "success" && "Correct"}
          {getBadgeVariant() === "error" && "Incorrect"}
          {getBadgeVariant() === "warning" && "Unanswered"}
        </Badge>
        {helperQuizResponses[activeQuestion]?.options?.map((option) => (
          <div key={option} className="grid gap-3">
            <EachQuestion
              option={option}
              quiz={quiz}
              activeQuestion={activeQuestion}
              scored={() => {
                if (
                  helperQuizResponses[activeQuestion].correct_answer === option
                ) {
                  return 1;
                }

                if (
                  helperQuizResponses[activeQuestion].user_answer === option &&
                  helperQuizResponses[activeQuestion].scored === false
                ) {
                  return 0;
                }

                return undefined;
              }}
              is_correct_answer={
                option === helperQuizResponses[activeQuestion].correct_answer
              }
            />
          </div>
        ))}

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
            disabled={activeQuestion + 1 === (quiz?.questions?.length ?? 0)}
            onClick={() => handleActiveQuestionChange({ direction: "next" })}
            className="bg-black h-fit w-1/2 md:w-fit hover:bg-opacity-70 transition-colors duration-200 text-white rounded-full px-7 py-3 flex gap-4 items-center disabled:opacity-50"
          >
            <span className="font-bold">Next</span>

            <MoveRight />
          </button>
        </div>
      </div>
    </div>
  );
}
