"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formFields } from "@/FormFields";
import { Switch } from "./ui/switch";
import { Field, useFieldsContext } from "@/context/fieldContext";
import { PencilLine } from "lucide-react";

interface EditFieldButtonProps {
  field: Field;
}

function EditFieldButton({ field }: EditFieldButtonProps) {
  const { editField } = useFieldsContext();
  const [open, setOpen] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState(field.type || "");
  const [fieldLabel, setFieldLabel] = useState(field.label || "");
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [isRequired, setIsRequired] = useState(field.required || false);

  function handleComponent(value: string) {
    setSelectedComponent(value);
  }

  function handleEditField() {
    if (selectedComponent && fieldLabel) {
      const selectedField = formFields.find(
        (field) => field.value === selectedComponent
      );

      if (!selectedField) return;

      const updatedField = {
        ...field,
        label: fieldLabel,
        placeholder: selectedComponent !== "Heading" ? placeholder : "",
        required: selectedComponent !== "Heading" ? isRequired : false,
        type: selectedComponent,
        component: selectedField.component(fieldLabel,placeholder),
      };

      editField(field.id, updatedField);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button size="sm" variant={"ghost"} onClick={() => setOpen(true)}>
        <PencilLine />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold">
              Edit Form Field
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Field Type</Label>
                  <Select
                    onValueChange={handleComponent}
                    value={selectedComponent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select component type" />
                    </SelectTrigger>
                    <SelectContent>
                      {formFields.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Field Label</Label>
                  <Input
                    type="text"
                    placeholder="Enter field label"
                    value={fieldLabel}
                    onChange={(e) => setFieldLabel(e.target.value)}
                  />
                </div>
                {selectedComponent !== "Heading" &&
                  selectedComponent !== "Description" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Placeholder</Label>
                    <Input
                      type="text"
                      placeholder="Enter placeholder"
                      value={placeholder}
                      onChange={(e) => setPlaceholder(e.target.value)}
                    />
                  </div>
                )}
                {selectedComponent !== "Heading" &&
                  selectedComponent !== "Description" && (
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">
                      Required
                    </Label>
                    <Switch
                      checked={isRequired}
                      onCheckedChange={setIsRequired}
                    />
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              onClick={handleEditField}
              disabled={!selectedComponent || !fieldLabel}
              className="w-full"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditFieldButton;
