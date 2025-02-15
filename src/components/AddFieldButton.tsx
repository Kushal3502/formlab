"use client";

import { formFields } from "@/FormFields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldsContext } from "@/context/fieldContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

function AddFieldButton() {
  const { addField } = useFieldsContext();

  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  function handleComponent(value: string) {
    setSelectedComponent(value);
  }

  function handleAddField() {
    if (selectedComponent && fieldLabel) {
      const selectedField = formFields.find(
        (field) => field.value === selectedComponent
      );

      if (!selectedField) return;

      const newField = {
        id: Date.now().toString(),
        label: fieldLabel,
        placeholder: selectedComponent !== "Heading" ? placeholder : "",
        required: selectedComponent !== "Heading" ? isRequired : false,
        type: selectedComponent,
        component: selectedField.component(fieldLabel, placeholder),
      };

      addField(newField);
      setSelectedComponent("");
      setFieldLabel("");
      setPlaceholder("");
      setIsRequired(false);
      setOpen(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <Button
        size="sm"
        className="w-full font-medium py-2 rounded-lg shadow-md transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        Add Field
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold">
              Add Form Field
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-6 pt-4">
                {/* Field Type Selector */}
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

                {/* Field Label */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Field Label</Label>
                  <Input
                    type="text"
                    placeholder="Enter field label"
                    value={fieldLabel}
                    onChange={(e) => setFieldLabel(e.target.value)}
                  />
                </div>

                {/* Placeholder - Hidden for Heading */}
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

                {/* Required Toggle - Hidden for Heading */}
                {selectedComponent !== "Heading" &&
                  selectedComponent !== "Description" && (
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Required</Label>
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
              onClick={handleAddField}
              disabled={!selectedComponent || !fieldLabel}
              className="w-full"
            >
              Add Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddFieldButton;
