import { TQuiz } from "@/@types/TQuiz";

import QuizForm, { TAnswer } from "./quiz-form";
import { api } from "@/lib/fetch";
import validateQuizAnswers from "@/app/api/public/quiz/validate-answers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  const submitQuizAction = async (answers: TAnswer[]) => {
    "use server";

    const response = await validateQuizAnswers(answers);

    const cookieStore = await cookies();
    await cookieStore.set(`${quizId}-quiz-response`, JSON.stringify(response), {
      maxAge: 500000,
    });
    await cookieStore.set(`${quizId}-quiz-questions`, JSON.stringify(quiz), {
      maxAge: 500000,
    });

    await new Promise((r) => setTimeout(r, 5000));

    redirect(`/quiz/${quizId}/score`);
  };

  return (
    <main className="max-w-5xl mx-auto py-10 flex flex-col space-y-10 px-10">
      <div className="grid gap-3">
        <h1 className="text-3xl font-bold">{quiz?.name}</h1>
        <p>{quiz?.description}</p>
      </div>

      <QuizForm submitQuizAction={submitQuizAction} quiz={quiz} />
    </main>
  );
}
