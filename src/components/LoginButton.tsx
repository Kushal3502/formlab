import React from "react";
import { Button } from "./ui/button";
import { handleSignIn } from "@/actions/authActions";

function LoginButton() {
  return (
    <form action={handleSignIn}>
      <Button className=" bg-rose-600 hover:bg-rose-700 text-white" size={"sm"} type="submit">
        Get started
      </Button>
    </form>
  );
}

export default LoginButton;
