import QuizCard from "./quiz-card";
import Spinner from "../../common/spinner";
import { api } from "@/lib/fetch";
import { TQuiz } from "@/@types/TQuiz";

async function getAllQuizzes() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(api("/quiz"));

    if (!res.ok) {
      throw new Error("Failed to fetch quiz details");
    }

    return res.json();
  } catch {
    throw new Error("Failed to fetch quiz details");
  }
}

export default async function AllQuiz() {
  const quiz = await getAllQuizzes();

  if (!quiz)
    return (
      <div className="h-[60vh] w-[100vw] mx-auto my-auto flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <ul className="py-5 grid grid-cols-3 gap-5">
        {quiz.quizzes &&
          quiz.quizzes?.map((q: TQuiz) => <QuizCard key={q.id} {...q} />)}
      </ul>
    </div>
  );
}
