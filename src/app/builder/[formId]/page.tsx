"use client";

import Builder from "@/components/Builder";
import PreviewButton from "@/components/PreviewButton";
import PublishButton from "@/components/PublishButton";
import SaveButton from "@/components/SaveButton";
import { useParams } from "next/navigation";
import React from "react";

function FormBuilder() {
  const { formId } = useParams();

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h4>Form</h4>
        <div className=" flex justify-center items-center gap-2">
          <PreviewButton />
          <SaveButton />
          <PublishButton/>
        </div>
      </div>
      <div>
        <Builder />
      </div>
    </div>
  );
}

export default FormBuilder;
