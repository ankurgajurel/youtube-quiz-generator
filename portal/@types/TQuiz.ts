export type TQuiz = {
  id: number;
  name: string;
  description: string;
  video_id: number;
  questions?: TQuestion[];
  quiz_timer?: number;
};

export type TQuizReponse = {
  score: number;
  wrong_answers: {
    question_id: number;
    correct_answer: string;
    answer: string;
  }[];
  scored_answers: {
    question_id: number;
    correct_answer: string;
    answer: string;
  }[];
};

export type TQuestion = {
  question_id: number;
  question_text: string;
  options: string[];
};
