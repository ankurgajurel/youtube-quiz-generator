import { Metadata } from "next";
import AllQuiz from "@/components/quiz/list-quizzes/all-quiz";

export const metadata: Metadata = {
  title: "Quiz App | Home",
  description: "Home Page for Quiz App",
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-10">
      <h1 className="text-5xl font-bold">Quizzes</h1>
      <AllQuiz />
    </div>
  );
}
