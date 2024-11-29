import Link from "next/link";

export default function Navbar() {
  const nav = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Create Quiz", path: "/" },
  ];

  return (
    <header className="mx-auto max-w-5xl py-5 px-10 rounded-full w-full border shadow-sm flex justify-between mt-5 items-center">
      <Link href={"/"}>
        <div className="logo text-2xl font-bold">Youtube Quiz</div>
      </Link>
      <nav>
        <ul className="flex gap-10">
          {nav.map((n) => (
            <li key={n.name} className="font-medium">
              <Link href={n.path}>{n.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
