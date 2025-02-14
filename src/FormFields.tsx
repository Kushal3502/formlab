import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export const formFields = [
  {
    value: "Heading",
    component: <Input type="text" />,
  },
  {
    value: "Text Input",
    component: <Input type="text" />,
  },
  {
    value: "Number Input",
    component: <Input type="number" />,
  },
  {
    value: "Email Input",
    component: <Input type="email" />,
  },
  {
    value: "Textarea",
    component: <Textarea rows={5} />,
  },
];
