import PlayQuiz from "@/components/quiz/play-quiz";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <PlayQuiz quizId={id} />
    </div>
  );
}
