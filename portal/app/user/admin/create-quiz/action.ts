"use server";

import generateQuestions from "@/app/api/admin/quiz/generate-questions";
import createQuiz from "@/app/api/admin/quiz/create-quiz";
import { redirect } from "next/navigation";

export const handleSubmitAction = async (formData: FormData) => {
  try {
    const isVtt = formData.get("is-vtt") === "on";

    let genQnsRes: {
      questions: { question_id: number }[];
      video_id: string;
    };

    console.log("myformdata", JSON.stringify(formData));

    if (!isVtt) {
      genQnsRes = await generateQuestions({
        videoUrl: formData.get("youtube-url") as string,
        noOfQns: parseInt(formData.get("no-of-qns") as string),
      });
    } else {
      const vttUrl = formData.get("vtt-url") as string;
      genQnsRes = await generateQuestions({
        vttFileUrl: vttUrl,
        noOfQns: parseInt(formData.get("no-of-qns") as string),
      });
    }

    console.log(genQnsRes);

    const question_ids: string[] = genQnsRes.questions.map(
      (q: { question_id: number }) => q.question_id.toString()
    );

    console.log(question_ids);

    const createQuizRes = await createQuiz(
      formData.get("quiz-name") as string,
      genQnsRes.video_id.toString(),
      formData.get("quiz-description") as string,
      question_ids,
      parseInt(formData.get("quiz-timer") as string)
    );

    console.log(createQuizRes);

    await redirect("/admin");
  } catch (e) {
    console.error(e);
  }
};
