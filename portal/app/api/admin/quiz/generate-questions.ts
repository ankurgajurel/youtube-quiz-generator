import { axiosInstance } from "@/lib/axios";

export type QuizAnswer = {
  question_id: number;
  answer: string;
};

export default async function generateQuestions(videoUrl: string) {
  try {
    const response = await axiosInstance.post(
      "/questions/generate",
      {},
      {
        params: {
          video_url: videoUrl,
          questions: 10,
          options: 4,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
}
