"use client";

import { formFields } from "@/FormFields";
import { submitResponse } from "@/actions/formActions";
import { Button } from "@/components/ui/button";
import { Field, useFieldsContext } from "@/context/fieldContext";
import { useFormContext } from "@/context/formContext";
import { Form } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function FormSubmission() {
  const { formId } = useParams();

  const { fetchFormData, loading } = useFormContext();
  const { fields, setFields } = useFieldsContext();
  const [formData, setFormData] = useState<Form | null>();
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function fetchForm() {
    if (!formId) return;
    const response = await fetchFormData(formId as string);
    console.log(response);

    if (response) {
      setFormData(response);
      const parsedFields = response.fields;
      setFields(parsedFields);
    }
  }

  function handleChange(fieldId: string, value: string) {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const responseData = JSON.stringify(responses);
      console.log(responseData);

      const response = await submitResponse(formId as string, responseData);

      if (response) {
        toast.success("Response submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response.");
    } finally {
      setSubmitting(false);
      setResponses({});
    }
  }

  function getComponent(
    type: string,
    label?: string,
    placeholder?: string,
    value?: string,
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) {
    const field = formFields.find((field) => field.value === type);

    if (field) {
      return field.component(label, placeholder, value, onChange);
    }
    return null;
  }

  useEffect(() => {
    fetchForm();
  }, []);

  if (loading) return <p>Loading form...</p>;
  if (formData && !formData.isAccepting)
    return <p>This form is no longer accepting responses.</p>;

  return (
    <div className="">
      {formData && (
        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg">
          <form className="mt-4 space-y-4">
            {fields &&
              fields.length > 0 &&
              fields.map((field: Field) => (
                <div key={field.id}>
                  {getComponent(
                    field.type,
                    field.label,
                    field.placeholder,
                    responses[field.id],
                    (e) => handleChange(field.id, e.target.value)
                  )}
                </div>
              ))}
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-full"
              disabled={submitting}
            >
              {submitting ? <Loader2 className=" animate-spin" /> : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormSubmission;
