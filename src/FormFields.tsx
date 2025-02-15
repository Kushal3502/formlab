import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export const formFields = [
  {
    value: "Heading",
    component: (label: string) => <h2 className="text-lg font-bold">{label}</h2>,
  },
  {
    value: "Text Input",
    component: () => <Input type="text" />,
  },
  {
    value: "Number Input",
    component: () => <Input type="number" />,
  },
  {
    value: "Email Input",
    component: () => <Input type="email" />,
  },
  {
    value: "Textarea",
    component: () => <Textarea rows={5} />,
  },
];
