import Spinner from "@/components/common/spinner";

export default function Loading() {
  return (
    <div className="h-[60vh] w-[100vw] mx-auto my-auto flex items-center justify-center">
      <Spinner />
    </div>
  );
}
