"use client";

import { Switch } from "@/components/ui/switch";
import clsx from "clsx";
import SubmitButton from "./submit-button";
import { formItems } from "./form-items";
import { handleSubmitAction } from "./action";

export default function CreateQuizForm() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObj: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });

    console.log(formDataObj);

    await handleSubmitAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-10">
      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {formItems.map((item) => {
          if (item.type === "checkbox") {
            return (
              <div className="flex flex-col justify-between" key={item.id}>
                <label className="block text-lg font-medium text-gray-700">
                  Are you using a VTT file instead of a YouTube video?
                </label>

                <Switch name={item.id} className="my-auto" />
              </div>
            );
          }

          return (
            <Input
              name={item.id}
              key={item.id}
              label={item.label}
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
            />
          );
        })}
      </div>
      <SubmitButton />
    </form>
  );
}

type InputProps = {
  label: string;
  id: string;
  cols?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className={props.cols}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={clsx(
          "block w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray bg-blur-2xl",
          props.className
        )}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
}
