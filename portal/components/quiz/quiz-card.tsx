import { TQuiz } from "@/@types/TQuiz";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function QuizCard(quiz: TQuiz) {
  return (
    <div className="border border-black transition-transform duration-300 p-5 w-fit rounded-xl grid gap-5 bg-[#a89d9d] bg-opacity-10">
      <div className="grid gap-2">
        <h1 className="text-2xl font-medium">{quiz.name}</h1>
        <p className="font-medium">{quiz.description}</p>
      </div>
      <Link href={"/quiz/" + quiz.id}>
        <button className="flex items-center gap-1 hover:underline">
          Take Quiz
          <MoveRight size={16} />
        </button>
      </Link>
    </div>
  );
}
