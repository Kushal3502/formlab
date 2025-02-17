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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    if (value) {
      setErrors((prev) => {
        const { [fieldId]: removedError, ...rest } = prev;
        return rest;
      });
    }
  }

  function validateForm() {
    let formErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.required && !responses[field.id]) {
        formErrors[field.id] = `${field.label} is required.`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const responseData = JSON.stringify(responses);
      console.log(responseData);

      const response = await submitResponse(formId as string, responseData);

      if (response) {
        toast.success("Thanks for your response...");
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

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="text-xl font-semibold px-8 py-4 flex justify-center items-center gap-3">
          <Loader2 className=" animate-spin" />
          <span className="">Loading form...</span>
        </div>
      </div>
    );

  if (formData && !formData.isAccepting)
    return (
      <div className="h-screen flex items-center justify-center ">
        <p className="text-xl font-semibold px-8 py-4 rounded-xl shadow-lg border ">
          This form is no longer accepting responses.
        </p>
      </div>
    );

  return (
    <div className="h-screen my-auto py-12">
      {formData && (
        <div className="max-w-xl mx-auto p-5 rounded-2xl backdrop-blur-md  shadow-2xl border ">
          <form className="mt-6 space-y-4">
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
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm">{errors[field.id]}</p>
                  )}
                </div>
              ))}
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-full font-semibold py-3 rounded-xl shadow-lg transform hover:translate-y-[-2px] transition-all duration-200 mt-8"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormSubmission;
