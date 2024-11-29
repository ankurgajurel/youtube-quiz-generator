import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold">Admin Page</h1>
      <Link className="text-xl text-blue-400 hover:text-blue-600 hover:underline mt-10" href="/create-quiz">Create Quiz</Link>
    </div>
  );
}
