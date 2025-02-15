"use client";

import { JSX, ReactElement, createContext, useContext, useState } from "react";

export interface Field {
  id: string;
  label?: string;
  placeholder?: string;
  component: JSX.Element;
  type: string;
  required?: boolean;
}

interface FieldsContextType {
  fields: Field[];
  addField: (newField: Field) => void;
  removeField: (id: string) => void;
  editField: (id: string, updatedField: Field) => void;
}

const FieldsContext = createContext<FieldsContextType | undefined>(undefined);

export const FieldsProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (newField: Field) => {
    setFields((prevFields) => [...prevFields, newField]);
  };

  const editField = (id: string, updatedField: Field) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? updatedField : field))
    );
  };

  const removeField = (id: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  return (
    <FieldsContext.Provider
      value={{ fields, addField, removeField, editField }}
    >
      {children}
    </FieldsContext.Provider>
  );
};

export const useFieldsContext = () => {
  const context = useContext(FieldsContext);
  if (!context) {
    throw new Error("useFieldsContext must be used within a FieldsProvider");
  }
  return context;
};

export default FieldsContext;
