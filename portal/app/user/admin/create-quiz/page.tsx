"use client";

import createQuiz from "@/app/api/admin/quiz/create-quiz";
import generateQuestions from "@/app/api/admin/quiz/generate-questions";
import clsx from "clsx";
import { Loader2Icon, MoveRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export default function CreateQuiz() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    video_url?: string;
    questions?: number;
    options?: number;
    is_vtt: boolean;
    vtt_file_url?: string;
    quiz_name: string;
    quiz_description: string;
    quiz_timer: number;
  }>({
    video_url: "",
    questions: 10,
    options: 4,
    is_vtt: false,
    vtt_file_url: "",
    quiz_name: "",
    quiz_description: "",
    quiz_timer: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const genQnsRes = await generateQuestions({
        videoUrl: (e.currentTarget["youtube-url"] as HTMLInputElement).value,
        noOfQns: parseInt(
          (e.currentTarget["no-of-qns"] as HTMLInputElement).value
        ),
      });

      const question_ids: string[] = genQnsRes.questions.map(
        (q: { question_id: number }) => q.question_id.toString()
      );

      console.log(e);

      const createQuizRes = await createQuiz(
        formData.quiz_name,
        genQnsRes.video_id.toString(),
        formData.quiz_description,
        question_ids,
        formData.quiz_timer
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
            label="Quiz Name"
            id="quiz-name"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, quiz_name: e.target.value });
            }}
            placeholder="Enter the quiz name"
          />
          <Input
            label="Quiz Description"
            id="quiz-description"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, quiz_description: e.target.value });
            }}
            placeholder="Enter the quiz description"
          />
          <Input
            label="No. of questions"
            id="no-of-qns"
            type="number"
            defaultValue={10}
            maxLength={20}
            onChange={(e) => {
              setFormData({ ...formData, questions: parseInt(e.target.value) });
            }}
            placeholder="Enter the number of questions"
          />
          <Input
            label="No. of options"
            id="no-of-options"
            type="number"
            maxLength={5}
            value={4}
            onChange={(e) => {
              setFormData({ ...formData, options: parseInt(e.target.value) });
            }}
            placeholder="Enter the number of options per question"
          />
          <Input
            label="Quiz Timer"
            id="quiz-timer"
            type="text"
            value={4}
            onChange={(e) => {
              setFormData({
                ...formData,
                quiz_timer: parseInt(e.target.value),
              });
            }}
            placeholder="Enter the timero for quiz in seconds. (Optional)"
          />
          <div className="flex flex-col justify-between">
            <label className="block text-lg font-medium text-gray-700">
              Are you using a VTT file instead of a YouTube video?
            </label>

            <Switch
              className="my-auto"
              checked={formData.is_vtt}
              onCheckedChange={(e) => {
                setFormData({ ...formData, is_vtt: e });
              }}
            />
          </div>
          <Input
            cols="col-span-2"
            label={formData.is_vtt ? "VTT File URL" : "Youtube URL"}
            id={formData.is_vtt ? "vtt-url" : "youtube-url"}
            className="w-3/4"
            type="text"
            value={formData.is_vtt ? formData.vtt_file_url : formData.video_url}
            onChange={(e) => {
              if (formData.is_vtt) {
                setFormData({
                  ...formData,
                  vtt_file_url: e.target.value,
                });
              } else {
                setFormData({
                  ...formData,
                  video_url: e.target.value,
                });
              }
            }}
            placeholder={
              formData.is_vtt
                ? "https://cdn.sample.com/sample.vtt"
                : "https://www.youtube.com/watch?v=..."
            }
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
