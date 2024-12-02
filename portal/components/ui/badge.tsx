import { cn } from "@/lib/utils";

export const badgeVariantClassMaps = {
  success:
    "bg-green-500/50 border-2 border-green-500 font-medium text-green-600",
  warning:
    "bg-yellow-500/50 border-yellow-500 border-2 text-yellow-700 font-medium",
  error:
    "bg-red-500/50 border-red-500 border-2 text-white text-red-600 font-medium",
};

type Props = {
  variant: "success" | "warning" | "error";
} & React.HTMLAttributes<HTMLDivElement>;

export default function Badge({ variant, ...props }: Props) {
  return (
    <div
      className={cn(
        "w-fit py-0 px-3 h-fit rounded-full flex items-center justify-center",
        props.className,
        badgeVariantClassMaps[variant]
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
