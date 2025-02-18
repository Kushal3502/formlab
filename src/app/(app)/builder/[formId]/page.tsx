"use client";

import { getFormById } from "@/actions/formActions";
import Builder from "@/components/Builder";
import PreviewButton from "@/components/PreviewButton";
import PublishButton from "@/components/PublishButton";
import SaveButton from "@/components/SaveButton";
import { useFieldsContext } from "@/context/fieldContext";
import { useFormContext } from "@/context/formContext";
import { Form } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function FormBuilder() {
  const { formId } = useParams();
  const { loading } = useFormContext();
  const { setFields } = useFieldsContext();
  const [formData, setFormData] = useState<Form>();

  useEffect(() => {
    const fetchForm = async () => {
      const response = await getFormById(formId as string);
      console.log(response);

      if (response) {
        setFormData(response);

        const parsedFields = response.fields;
        // @ts-expect-error Parsed fields type mismatch with Field[]
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

  if (!formData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">No form found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h4>{formData?.title}</h4>
        <div className=" flex justify-center items-center gap-2">
          <PreviewButton />
          <SaveButton formId={formId as string} />
          <PublishButton formId={formId as string} />
        </div>
      </div>
      <Builder />
    </div>
  );
}

export default FormBuilder;
