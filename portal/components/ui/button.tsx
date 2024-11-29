type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="bg-[#a89d9d] bg-opacity-10 text-black font-medium py-2 px-5 rounded-lg hover:bg-opacity-20"
    >
      {children}
    </button>
  );
}
