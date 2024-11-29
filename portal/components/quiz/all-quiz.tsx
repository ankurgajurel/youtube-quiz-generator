"use client";

import { TQuiz } from "@/@types/TQuiz";
import useSWR from "swr";
import QuizCard from "./quiz-card";
import { axiosInstance } from "@/lib/axios";
import Spinner from "../common/spinner";

export default function AllQuiz() {
  const { data, isLoading } = useSWR<{ data: { quizzes: TQuiz[] } }>(
    "/quiz",
    axiosInstance
  );

  const quiz = data?.data?.quizzes;

  if (isLoading)
    return (
      <div className="h-[60vh] mx-auto my-auto flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <ul className="py-5">
        {quiz?.map((q) => (
          <QuizCard key={q.id} {...q} />
        ))}
      </ul>
    </div>
  );
}
