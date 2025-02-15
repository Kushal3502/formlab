import { ReactElement } from "react";

export interface FormFieldType {
  id: Date;
  label: string;
  placeholder: string;
  required: boolean;
  component: ReactElement;
}
