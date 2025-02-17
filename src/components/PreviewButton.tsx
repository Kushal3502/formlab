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
import { formFields } from "@/FormFields";

function PreviewButton() {
  const { fields } = useFieldsContext();

  const [open, setOpen] = useState(false);

  function getComponent(type: string, label?: string, placeholder?: string) {
    const field = formFields.find((field) => field.value === type);
    if (field) {
      return field.component(label as string, placeholder as string);
    }
    return null;
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <>
      <Button size={"sm"} onClick={handleOpen}>
        <Eye />
        Preview
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Form Preview</DialogTitle>
            <DialogDescription>
              {fields && fields.length > 0 ? (
                fields.map((item) => (
                  <div key={item.id} className="my-4">
                    {getComponent(item.type, item.label, item.placeholder)}
                  </div>
                ))
              ) : (
                <p>No fields available</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreviewButton;
