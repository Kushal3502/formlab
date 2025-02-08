"use client";

import { getForms } from "@/actions/formActions";
import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";

function Forms() {
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

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-48 rounded-lg" />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {forms && forms.map((item) => <FormCard key={item.id} />)}
    </div>
  );
}

export default Forms;

function FormCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-gray-800">Form Title</h3>
        <p className="text-sm text-gray-600">Form Description</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Active
          </span>
          <span className="text-xs text-gray-500">
            Created: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
