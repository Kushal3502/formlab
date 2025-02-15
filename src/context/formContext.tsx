"use client";

import { getFormById } from "@/actions/formActions";
import { Form } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface FormContextType {
  formData: Form | null;
  fetchFormData: (formId: string) => Promise<void>;
  loading: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<Form | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFormData = async (formId: string) => {
    try {
      setLoading(true);
      const response = await getFormById(formId);
      setFormData(response);
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ formData, fetchFormData, loading }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export default FormContext;
