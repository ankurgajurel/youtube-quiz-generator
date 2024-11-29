import { axiosInstance } from "@/lib/axios";

export type QuizAnswer = {
  question_id: number;
  answer: string;
};

export default async function validateQuizAnswers(answers: QuizAnswer[]) {
  try {
    const response = await axiosInstance.post(
      "/quiz/validate-answers",
      answers
    );
    return response.data;
  } catch (error) {
    return { error };
  }
}
