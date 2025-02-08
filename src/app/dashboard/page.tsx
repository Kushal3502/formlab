"use client";

import { getForms } from "@/actions/formActions";
import CreateFormButton from "@/components/CreateFormButton";
import FormCard from "@/components/FormCard";
import Forms from "@/components/FormCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Dashboard() {
  const [forms, setForms] = useState<Form[]>();
  const [loading, setLoading] = useState(false);

  async function fetchForms() {
    setLoading(true);
    try {
      const response = await getForms();
      setForms(response);
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      <div>
        <h3 className=" md:text-3xl text-2xl font-semibold my-4">
          Get Started
        </h3>
        <CreateFormButton />
      </div>
      <Separator className=" my-6" />
      <div>
        <h3 className=" md:text-3xl text-2xl font-semibold my-6">
          Your forms📝
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5">
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-48 rounded-lg" />
            ))}
          {forms && forms.map((item) => <FormCard key={item.id} data={item} />)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
