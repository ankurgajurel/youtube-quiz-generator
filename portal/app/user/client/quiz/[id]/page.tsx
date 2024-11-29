import PlayQuiz from "@/components/quiz/play-quiz";

export default async function HomePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <PlayQuiz quizId={id} />
    </div>
  );
}
