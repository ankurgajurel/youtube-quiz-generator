import QuizCard from "./quiz-card";
import { api } from "@/lib/fetch";
import { TQuiz } from "@/@types/TQuiz";

async function getAllQuizzes() {
  try {
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

  return (
    <div>
      <ul className="py-5 grid grid-cols-3 gap-5">
        {quiz.quizzes &&
          quiz.quizzes?.map((q: TQuiz) => <QuizCard key={q.id} {...q} />)}
      </ul>
    </div>
  );
}
