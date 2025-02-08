import React from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

function SaveButton() {
  return (
    <Button size={"sm"}>
      <Save />
      Save
    </Button>
  );
}

export default SaveButton;
