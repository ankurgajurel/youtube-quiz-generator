import { THelperQuizResponses } from "./score-board";
import { cn } from "@/lib/utils";
import { badgeVariantClassMaps } from "@/components/ui/badge";

export default function ScoreBoardQuestionsIndex({
  displayHelperAnswers,
  activeQuestion,
  setActiveQuestion,
}: {
  displayHelperAnswers: THelperQuizResponses;
  activeQuestion: number;
  setActiveQuestion?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getBadgeVariant = (activeQuestion: number) => {
    if (!displayHelperAnswers) return;

    if (!displayHelperAnswers[activeQuestion]?.user_answer) return "warning";

    if (
      displayHelperAnswers[activeQuestion].correct_answer ===
      displayHelperAnswers[activeQuestion].user_answer
    ) {
      return "success";
    }

    return "error";
  };

  return (
    <div className="flex flex-wrap gap-x-5">
      {[...Array(displayHelperAnswers?.length)].map((eachQn, index) => (
        <div
          onClick={() => setActiveQuestion && setActiveQuestion(index)}
          className={cn(
            "p-3 rounded-full text-center cursor-pointer hover:bg-opacity-90 h-10 w-10 flex items-center justify-center",
            badgeVariantClassMaps[getBadgeVariant(index) || "success"],
            activeQuestion === index && "scale-[130%] transition-transform duration-200"
          )}
          key={index}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
