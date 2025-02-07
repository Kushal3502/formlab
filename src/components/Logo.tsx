import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={"/"}
        className="md:text-3xl text-xl font-bold bg-gradient-to-b from-rose-300 to-rose-600 bg-clip-text text-transparent transition-colors duration-300"
      >
        Formlab
      </Link>
    </div>
  );
}

export default Logo;
