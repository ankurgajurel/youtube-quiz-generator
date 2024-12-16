import CreateQuizForm from "./create-quiz-form";

export default function CreateQuiz() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <p className="text-xl tracking-tighter">
          Enter your Youtube URL and create a quiz in less than a minute.
        </p>
      </div>
      <CreateQuizForm />
    </div>
  );
}
