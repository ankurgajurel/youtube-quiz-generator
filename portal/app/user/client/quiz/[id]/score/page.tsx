import { TQuiz, TQuizReponse } from "@/@types/TQuiz";
import ScoreBoard from "@/components/quiz/player/score/score-board";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function QuizResult({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();

  const quizResponses = cookieStore.get(`${id}-quiz-response`)?.value;
  const quizQuestions = cookieStore.get(`${id}-quiz-questions`)?.value;

  if (!quizQuestions || !quizResponses) redirect(`/quiz/${id}`);

  return (
    <div className="py-10">
      <ScoreBoard
        quiz={JSON.parse(quizQuestions) as TQuiz}
        quizResponses={JSON.parse(quizResponses) as TQuizReponse}
        quiz_id={id}
      />
    </div>
  );
}
