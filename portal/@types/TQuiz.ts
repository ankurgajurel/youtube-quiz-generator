export type TQuiz = {
  id: number;
  name: string;
  description: string;
  video_id: number;
  questions?: TQuestion[];
  quiz_timer?: number;
};

export type TQuestion = {
  question_id: number;
  question_text: string;
  options: string[];
};
