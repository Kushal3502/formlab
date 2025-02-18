"use client";

import { handleSignIn } from "@/actions/authActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface LoginButtonProps {
  children?: ReactNode;
}

function LoginButton({ children = "Get Started" }: LoginButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();

  async function signIn() {
    if (session) {
      router.push("/dashboard");
    } else {
      await handleSignIn();
    }
  }

  return (
    <Button onClick={signIn}>
      {children}
    </Button>
  );
}

export default LoginButton;
