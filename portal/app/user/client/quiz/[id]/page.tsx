import { Metadata, ResolvingMetadata } from "next"
import PlayQuiz from "@/components/quiz/player/play-quiz";

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
){
	const id = (await params).id

	return {
		title: `Quiz ${id}`
	}
}

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
