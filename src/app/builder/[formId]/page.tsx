"use client";

import { useParams } from "next/navigation";
import React from "react";

function FormBuilder() {
  const { formId } = useParams();

  return <div>FormBuilder - {formId}</div>;
}

export default FormBuilder;
