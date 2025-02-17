"use client";

import { formFields } from "@/FormFields";
import { Button } from "@/components/ui/button";
import { useFieldsContext } from "@/context/fieldContext";
import { useFormContext } from "@/context/formContext";
import { Copy, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function PublishForm() {
  const { formId } = useParams();
  const { fetchFormData, loading } = useFormContext();
  const { fields, setFields } = useFieldsContext();
  const [link, setLink] = useState("");

  function getComponent(type: string, label?: string, placeholder?: string) {
    const field = formFields.find((field) => field.value === type);
    if (field) {
      return field.component(label as string, placeholder as string);
    }
    return null;
  }

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetchFormData(formId as string);
      if (response) {
        const parsedFields = response.fields;
        setFields(parsedFields);
        setLink(response.shareLink);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          Form Published Successfully
        </h3>
        <div className="backdrop-blur-sm border rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm md:text-base break-all flex-1">
            Share Link Here - {link}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigator.clipboard.writeText(link)}
            className="ml-2 hover:bg-gray-100"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="border rounded-lg shadow-sm p-8 backdrop-blur-sm">
          {fields && fields.length > 0 ? (
            <div className="space-y-6">
              {fields.map((item) => (
                <div key={item.id}>
                  {getComponent(item.type, item.label, item.placeholder)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-6 opacity-70">No fields available</p>
          )}
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:shadow-md"
            >
              Submit Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishForm;
