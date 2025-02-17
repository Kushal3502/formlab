"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Rss } from "lucide-react";
import { publishForm } from "@/actions/formActions";
import { toast } from "react-hot-toast";

function PublishButton({ formId }: { formId: string }) {
  const [loading, setLoading] = useState(false);

  async function handlePublishForm() {
    try {
      setLoading(true);
      const response = await publishForm(formId);
      console.log("Form published successfully:", response);
      toast.success("Form published!");
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
