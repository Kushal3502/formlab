"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { useFieldsContext } from "@/context/fieldContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function PreviewButton() {
  const { fields } = useFieldsContext();

console.log(fields);


  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size={"sm"} onClick={() => setOpen(true)}>
        <Eye />
        Preview
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreviewButton;
