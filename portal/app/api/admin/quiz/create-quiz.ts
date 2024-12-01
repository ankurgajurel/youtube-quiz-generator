import { axiosInstance } from "@/lib/axios";

export default async function createQuiz(
  quiz_name: string,
  video_id: string,
  quiz_description: string,
  questions_ids: string[],
  quiz_timer: number
) {
  try {
    const response = await axiosInstance.post(
      "/quiz/create-quiz",
      questions_ids,
      {
        params: {
          video_id,
          name: quiz_name,
          description: quiz_description,
          quiz_timer: quiz_timer,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { error };
  }
}
