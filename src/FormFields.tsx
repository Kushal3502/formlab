import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

export const formFields = [
  {
    value: "Heading",
    component: (label: string) => (
      <h2 className="text-lg font-bold">{label}</h2>
    ),
  },
  {
    value: "Description",
    component: (text: string) => (
      <p className="text-sm">{text}</p>
    ),
  },
  {
    value: "Text Input",
    component: (label?: string, placeholder?: string) => (
      <div>
        <Label className="mb-4">{label || ""}</Label>
        <Input type="text" placeholder={placeholder || ""} />
      </div>
    ),
  },
  {
    value: "Number Input",
    component: (label: string, placeholder: string) => (
      <div>
        <Label className="mb-4">{label || ""}</Label>
        <Input type="number" placeholder={placeholder || ""} />
      </div>
    ),
  },
  {
    value: "Email Input",
    component: (label?: string, placeholder?: string) => (
      <div>
        <Label className="mb-4">{label || ""}</Label>
        <Input type="email" placeholder={placeholder || ""} />
      </div>
    ),
  },
  {
    value: "Date Input",
    component: (label?: string, placeholder?: string) => (
      <div>
        <Label className="mb-4">{label || ""}</Label>
        <Input type="date" placeholder={placeholder || ""} />
      </div>
    ),
  },
  {
    value: "Textarea",
    component: (label?: string, placeholder?: string) => (
      <div>
        <Label className="mb-4">{label || ""}</Label>
        <Textarea rows={5} placeholder={placeholder || ""} />
      </div>
    ),
  },
];
