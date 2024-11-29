"use client";

import createQuiz from "@/app/api/admin/quiz/create-quiz";
import generateQuestions from "@/app/api/admin/quiz/generate-questions";
import clsx from "clsx";
import { Loader2Icon, MoveRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateQuiz() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const quizName = e.currentTarget["quiz-name"].value;
    const quizDescription = e.currentTarget["quiz-description"].value;
    try {
      const genQnsRes = await generateQuestions(
        (e.currentTarget["youtube-url"] as HTMLInputElement).value
      );

      const question_ids: string[] = genQnsRes.questions.map(
        (q: { question_id: number }) => q.question_id.toString()
      );

      console.log(e);

      const createQuizRes = await createQuiz(
        quizName,
        genQnsRes.video_id.toString(),
        quizDescription,
        question_ids
      );

      console.log(createQuizRes);

      router.push("http://client.localhost:8006");
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <p className="text-xl tracking-tighter">
          Enter your Youtube URL and create a quiz in less than a minute.
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 py-10"
      >
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <Input
            cols="col-span-2"
            label="Youtube URL"
            id="youtube-url"
            className="w-3/4"
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <Input
            label="Quiz Name"
            id="quiz-name"
            type="text"
            placeholder="Enter the quiz name"
          />
          <Input
            label="Quiz Description"
            id="quiz-description"
            type="text"
            placeholder="Enter the quiz description"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            "w-fit bg-black hover:bg-opacity-70 transition-colors duration-200 h-fit text-white rounded-full px-5 py-2 flex gap-4 items-center disabled:opacity-50"
          )}
        >
          <span className="font-bold flex gap-2 items-center">
            Generate Questions
            {isLoading ? (
              <Loader2Icon className="animate-spin" size={24} />
            ) : (
              <MoveRight />
            )}
          </span>
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  id: string;
  cols?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className={props.cols}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={clsx(
          "block w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray bg-blur-2xl",
          props.className
        )}
        placeholder={props.placeholder}
      />
    </div>
  );
}
