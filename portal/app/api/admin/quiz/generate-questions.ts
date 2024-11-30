import { axiosInstance } from "@/lib/axios";

export type QuizAnswer = {
  question_id: number;
  answer: string;
};

export default async function generateQuestions({
  videoUrl,
  noOfQns,
  noOfOptions,
}: {
  videoUrl?: string;
  vttFileUrl?: string;
  noOfQns?: number;
  noOfOptions?: number;
}) {
  try {
    const response = await axiosInstance.post(
      "/questions/generate",
      {},
      {
        params: {
          video_url: videoUrl,
          questions: noOfQns || 10,
          options: noOfOptions || 4,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
}
