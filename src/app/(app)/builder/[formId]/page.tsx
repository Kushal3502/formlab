"use client";

import Builder from "@/components/Builder";
import PreviewButton from "@/components/PreviewButton";
import PublishButton from "@/components/PublishButton";
import SaveButton from "@/components/SaveButton";
import { useFieldsContext } from "@/context/fieldContext";
import { useFormContext } from "@/context/formContext";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function FormBuilder() {
  const { formId } = useParams();
  const { formData, fetchFormData, loading } = useFormContext();
  const { setFields } = useFieldsContext();

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetchFormData(formId as string);
      console.log(response);

      if (response) {
        const parsedFields = response.fields;

        setFields(parsedFields);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading)
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h4>{formData?.title}</h4>
        <div className=" flex justify-center items-center gap-2">
          <PreviewButton />
          <SaveButton formId={formId as string} />
          <PublishButton />
        </div>
      </div>
      <Builder />
    </div>
  );
}

export default FormBuilder;
