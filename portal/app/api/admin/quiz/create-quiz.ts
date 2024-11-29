import { axiosInstance } from "@/lib/axios";

export default async function createQuiz(
  quiz_name: string,
  video_id: string,
  quiz_description: string,
  questions_ids: string[]
) {
  try {
    const response = await axiosInstance.post("/quiz/create-quiz", questions_ids, {
      params: {
        video_id,
        name: quiz_name,
        description: quiz_description,
      },
    });

    return response.data;
  } catch (error) {
    return { error };
  }
}
