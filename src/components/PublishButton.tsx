import React from "react";
import { Button } from "./ui/button";
import { Rss } from "lucide-react";

function PublishButton() {
  return (
    <Button size={"sm"}>
      <Rss   />
      Publish
    </Button>
  );
}

export default PublishButton;
