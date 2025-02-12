import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={"/"}
        className="md:text-3xl text-xl font-extrabold bg-gradient-to-b from-rose-200 to-rose-700 bg-clip-text text-transparent transition-colors duration-300"
      >
        Formlab
      </Link>
    </div>
  );
}

export default Logo;
