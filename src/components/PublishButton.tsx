"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Rss } from "lucide-react";
import { addFormData, publishForm } from "@/actions/formActions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFieldsContext } from "@/context/fieldContext";

function PublishButton({ formId }: { formId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fields } = useFieldsContext();

  async function handlePublishForm() {
    try {
      setLoading(true);
      if (fields.length > 0) {
        await addFormData(formId, fields);

        await publishForm(formId);

        toast.success("Form published!");
        router.push(`/form/${formId}`);
      } else {
        toast.error("Add some fields first");
      }
    } catch (error) {
      console.error("Error publishing form:", error);
      toast.error("Error publishing form!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size={"sm"} onClick={handlePublishForm}>
      {loading ? (
        <>
          <Loader2 className=" animate-spin" />
          Publishing...
        </>
      ) : (
        <>
          <Rss />
          Publish
        </>
      )}
    </Button>
  );
}

export default PublishButton;
