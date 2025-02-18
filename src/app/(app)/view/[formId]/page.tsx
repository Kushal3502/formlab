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
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 shadow-md rounded-lg border">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
          Form Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-4">
            <p className="flex flex-col gap-1">
              <strong className="text-base sm:text-lg">Title</strong>
              <span className="text-sm sm:text-base">{formData.title}</span>
            </p>
            <p className="flex flex-col gap-1">
              <strong className="text-base sm:text-lg">Description</strong>
              <span className="text-sm sm:text-base">
                {formData.description}
              </span>
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <Label
                htmlFor="accepting"
                className="font-medium text-sm sm:text-base"
              >
                Accepting responses
              </Label>
              <Switch
                id="accepting"
                checked={acceptResponses}
                onCheckedChange={toggleAcceptResponse}
              />
            </div>
          </div>
          <div className="p-4 sm:p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-base sm:text-lg">
              Share Form
            </h3>
            <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border">
              <p className="text-xs sm:text-sm max-w-[calc(100%-60px)] break-words overflow-hidden">
                {formData.shareLink}
              </p>
              <Button size="sm" className="ml-2" onClick={handleCopy}>
                {copied ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h3 className="font-semibold text-base sm:text-lg">
              Responses: {formData.submissions}
            </h3>
            <div className="flex items-center gap-2">
              <Label className="text-xs sm:text-sm">Refresh responses</Label>
              <Button size="sm" onClick={fetchResponses}>
                <RefreshCcw
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    refreshing ? "animate-spin" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {fields.map((field) => (
                    <TableHead
                      key={field.id}
                      className="font-medium text-xs sm:text-sm whitespace-nowrap"
                    >
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
                            className="text-xs sm:text-sm max-w-[150px] sm:max-w-[200px] break-words whitespace-pre-wrap"
                          >
                            {parsedContent[field.id] || "N/A"}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={fields.length}
                      className="text-center text-sm"
                    >
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
