"use client";

import {
  getFormById,
  getFormResponses,
  toggleAcceptState,
} from "@/actions/formActions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Field } from "@/context/fieldContext";
import { Form, Response } from "@prisma/client";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function FormDetails() {
  const { formId } = useParams();
  const [formData, setFormData] = useState<Form>();
  const [fields, setFields] = useState<Field[]>([]);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [acceptResponses, setAcceptResponses] = useState<boolean>();

  async function getFormDetails() {
    try {
      const form = await getFormById(formId as string);
      if (form) {
        setFormData(form);

        const filteredFields = Array.isArray(form.fields)
          ? form.fields.filter(
              (filter) =>
                filter.type !== "Heading" && filter.type !== "Description"
            )
          : [];

        setFields(filteredFields);
        setAcceptResponses(form.isAccepting);
      }

      fetchResponses();
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchResponses() {
    setRefreshing(true);
    try {
      const responseData = await getFormResponses(formId as string);
      const validResponses = responseData.filter(
        (response) => response.content !== "{}"
      );

      setResponses(validResponses);
    } catch (error) {
      console.error("Error fetching form responses:", error);
    } finally {
      setRefreshing(false);
    }
  }

  function handleCopy() {
    if (formData?.shareLink) {
      navigator.clipboard.writeText(formData.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function toggleAcceptResponse() {
    try {
      if (formData)
        await toggleAcceptState(formId as string, formData.isAccepting);
      setAcceptResponses(!acceptResponses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFormDetails();
  }, [formId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">No form found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className=" p-8 shadow-md rounded-lg border">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Form Details</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="flex flex-col">
              <span className="text-sm font-medium ">Title</span>
              <span className="">{formData.title}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-sm font-medium ">Description</span>
              <span className="">{formData.description}</span>
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <Label htmlFor="accepting" className="font-medium">
                Accepting responses
              </Label>
              <Switch
                id="accepting"
                checked={acceptResponses}
                onCheckedChange={toggleAcceptResponse}
              />
            </div>
          </div>
          <div className=" p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Share Form</h3>
            <div className="flex items-center justify-between p-3 rounded-lg  border">
              <p className="text-sm max-w-[calc(100%-48px)] break-words overflow-hidden">
                {formData.shareLink}
              </p>
              <Button size="icon" onClick={handleCopy}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Responses: {formData.submissions}
            </h3>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Refresh responses</Label>
              <Button size="sm" onClick={fetchResponses}>
                <RefreshCcw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {fields.map((field) => (
                    <TableHead key={field.id} className="font-medium">
                      {field.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses && responses.length > 0 ? (
                  responses.map((response, index) => {
                    const parsedContent = JSON.parse(response.content);
                    return (
                      <TableRow key={index}>
                        {fields.map((field) => (
                          <TableCell
                            key={field.id}
                            className="max-w-[200px] break-words whitespace-pre-wrap"
                          >
                            {parsedContent[field.id] || "N/A"}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={fields.length} className="text-center ">
                      No responses yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDetails;
