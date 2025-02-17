"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import { useFieldsContext } from "@/context/fieldContext";
import { toast } from "react-hot-toast";
import { addFormData } from "@/actions/formActions";

function SaveButton({ formId }: { formId: string }) {
  const { fields } = useFieldsContext();
  const [loading, setLoading] = useState(false);

  async function handleSaveForm() {
    try {
      setLoading(true);
      const response = await addFormData(formId, fields);
      console.log("Form saved successfully:", response);
      toast.success("Form saved!");
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Error saving form!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size={"sm"} onClick={handleSaveForm}>
      {loading ? (
        <>
          <Loader2 className=" animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save />
          Save
        </>
      )}
    </Button>
  );
}

export default SaveButton;
