"use client";

import { useState } from "react";
import AddFieldButton from "./AddFieldButton";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

function DropArea() {
  const [formFields, setFormFields] = useState<
    { id: string; label: string; component: React.ReactNode }[]
  >([]);

  const handleAddField = (newField: any) => {
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  const handleDeleteField = (id: string) => {
    setFormFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handleEditField = (id: string) => {
    // Implement edit logic here
    console.log("Editing field:", id);
  };

  return (
    <div className="max-w-md h-full mx-auto overflow-auto border p-3 rounded-xl shadow-md">
      <div className="space-y-4">
        {formFields.map((field) => (
          <div
            key={field.id}
            className="border p-3 rounded-lg shadow-sm bg-secondary-muted cursor-move"
          >
            <div className="flex justify-between items-center">
              <Label className="block text-sm font-medium mb-1">
                {field.label}
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditField(field.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteField(field.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="h-8 bg-secondary border rounded-md mt-1"></div>
          </div>
        ))}
      </div>
      <AddFieldButton onAddField={handleAddField} />
    </div>
  );
}

export default DropArea;
