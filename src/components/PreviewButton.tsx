"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFieldsContext } from "@/context/fieldContext";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

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
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className=" max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Form Preview</DialogTitle>
            <DialogDescription>
              {fields.map((item) => (
                <div key={item.id} className=" my-4">
                  {item.component}
                </div>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreviewButton;
