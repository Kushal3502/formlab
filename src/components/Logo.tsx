import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div>
      <h2 className="md:text-3xl text-xl font-semibold">
        <Link href={"/"}>Formlab📝</Link>
      </h2>
    </div>
  );
}

export default Logo;
