"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import LoginButton from "./LoginButton";
import UserDropdown from "./UserDropdown";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-background/60 flex justify-between items-center md:px-16 px-6 py-3 border-b">
      <Logo />
      <div className=" flex justify-center items-center gap-2">
        <ThemeSwitch />
        {status === "authenticated" && (
          <Button variant={"ghost"} size={"sm"} asChild>
            <Link href={"/dashboard"}>
              <LayoutDashboard />
              Dashboard
            </Link>
          </Button>
        )}
        {status === "authenticated" ? (
          <UserDropdown session={session} />
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
