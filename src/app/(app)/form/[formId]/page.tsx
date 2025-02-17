"use client";

import { formFields } from "@/FormFields";
import { Button } from "@/components/ui/button";
import { useFieldsContext } from "@/context/fieldContext";
import { useFormContext } from "@/context/formContext";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function PublishForm() {
  const { formId } = useParams();
  const { fetchFormData, loading } = useFormContext();
  const { fields, setFields } = useFieldsContext();

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
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 ">
      <div className="max-w-2xl mx-auto border rounded-lg shadow-lg ">
        <div className="p-6">
          {fields && fields.length > 0 ? (
            fields.map((item) => (
              <div 
                key={item.id} 
                className=" p-3 rounded-md transition-all "
              >
                {getComponent(item.type, item.label, item.placeholder)}
              </div>
            ))
          ) : (
            <p className="text-center py-4 ">No fields available</p>
          )}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="lg"
              className="w-full sm:w-auto px-6 py-2.5 font-medium rounded-md transition-colors"
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
