import React from "react";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

function PreviewButton() {
  return (
    <Button size={"sm"}>
      <Eye />
      Preview
    </Button>
  );
}

export default PreviewButton;
