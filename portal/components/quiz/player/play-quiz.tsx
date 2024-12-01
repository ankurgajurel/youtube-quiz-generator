import { TQuiz } from "@/@types/TQuiz";
import Spinner from "../../common/spinner";

import QuizForm from "./quiz-form";
import { api } from "@/lib/fetch";

async function getQuizDetails(quizId: number) {
  try {
    const res = await fetch(api(`/quiz/${quizId}`));

    if (!res.ok) {
      throw new Error("Failed to fetch quiz details");
    }

    return res.json();
  } catch {
    throw new Error("Failed to fetch quiz details");
  }
}

export default async function PlayQuiz({ quizId }: { quizId: string }) {
  const quiz: TQuiz = await getQuizDetails(+quizId);

  if (!quiz)
    return (
      <div className="h-[60vh] w-[100vw] mx-auto my-auto flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <main className="max-w-5xl mx-auto py-10 flex flex-col space-y-10 px-10">
      <div className="grid gap-3">
        <h1 className="text-3xl font-bold">{quiz?.name}</h1>
        <p>{quiz?.description}</p>
      </div>

      <QuizForm quiz={quiz} />
    </main>
  );
}
