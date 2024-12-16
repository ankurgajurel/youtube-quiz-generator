"use client";

import { Loader2Icon, MoveRight } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-fit bg-black hover:bg-opacity-70 transition-colors duration-200 h-fit text-white rounded-full px-5 py-2 flex gap-4 items-center disabled:opacity-50"
    >
      <span className="font-bold flex gap-2 items-center">
        Generate Questions
        {pending ? (
          <Loader2Icon className="animate-spin" size={24} />
        ) : (
          <MoveRight />
        )}
      </span>
    </button>
  );
}
