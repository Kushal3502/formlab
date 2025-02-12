"use client";

import { getFormById } from "@/actions/formActions";
import Builder from "@/components/Builder";
import PreviewButton from "@/components/PreviewButton";
import PublishButton from "@/components/PublishButton";
import SaveButton from "@/components/SaveButton";
import { Form } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function FormBuilder() {
  const { formId } = useParams();

  const [form, setForm] = useState<Form | null>();
  const [loading, setLoading] = useState(false);

  async function fetchFormDetails() {
    setLoading(true);
    try {
      const response = await getFormById(formId as string);
      console.log(response);

      setForm(response);
    } catch (error) {
      console.error("Error fetching form:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFormDetails();
  }, []);

  if (loading) return <div><Loader2 className=" animate-spin"/></div>;

  return (
    <div>
      {/* <div className=" flex justify-between items-center">
        <h4>{form?.title}</h4>
        <div className=" flex justify-center items-center gap-2">
          <PreviewButton />
          <SaveButton />
          <PublishButton />
        </div>
      </div> */}
      <div>
        <Builder />
      </div>
    </div>
  );
}

export default FormBuilder;
