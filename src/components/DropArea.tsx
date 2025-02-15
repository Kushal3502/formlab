"use client";

import { Field, useFieldsContext } from "@/context/fieldContext";
import { Trash2 } from "lucide-react";
import AddFieldButton from "./AddFieldButton";
import EditFieldButton from "./EditFieldButton";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

function DropArea() {
  const { fields, removeField } = useFieldsContext();

  return (
    <div className="max-w-md h-full mx-auto overflow-auto border p-3 rounded-xl shadow-md z-50 bg-muted">
      <div className="space-y-4">
        {fields.map((field: Field) => (
          <div
            key={field.id}
            className="border border-gray-500 p-3 rounded-lg shadow-sm bg-secondary-muted cursor-move"
          >
            <div className="flex justify-between items-center">
              <Label className="block text-sm font-medium mb-1">
                {field.label}
              </Label>
              <div className="flex gap-2">
                <EditFieldButton field={field} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(field.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="h-8 bg-secondary border border-gray-500 rounded-md mt-1"></div>
          </div>
        ))}
      </div>
      <AddFieldButton />
    </div>
  );
}

export default DropArea;
