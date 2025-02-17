"use server";

import { auth } from "@/auth";
import { Field } from "@/context/fieldContext";
import { prisma } from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schema/form";

export async function getForms() {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const forms = await prisma.form.findMany({
      where: {
        ownerId: user.user?.id,
      },
    });

    return forms;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching forms");
  }
}

export async function getFormById(id: string) {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const form = await prisma.form.findFirst({
      where: { id },
    });

    if (form) {
      form.fields = JSON.parse(form.fields);
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching form");
  }
}

export async function CreateForm(data: formSchemaType) {
  try {
    const isValid = formSchema.safeParse(data);

    if (!isValid.success) {
      throw new Error("Invalid inputs");
    }

    const user = await auth();

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const form = await prisma.form.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: user.user?.id as string,
      },
    });

    if (!form) throw new Error("Error creating form");

    return form.id;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating form");
  }
}

export async function addFormData(id: string, fields: Field[]) {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        fields: JSON.stringify(fields),
      },
    });

    return form;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding form");
  }
}

export async function publishForm(id: string) {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const form = await prisma.form.update({
      where: { id },
      data: {
        isPublished: true,
        shareLink: `http://localhost:3000/response/${id}`,
      },
    });

    return form;
  } catch (error) {
    console.error(error);
    throw new Error("Error publishing form");
  }
}

export async function getFormResponses(formId: string) {
  try {
    const user = await auth();
    if (!user) throw new Error("Unauthenticated");

    const responses = await prisma.response.findMany({
      where: { formId },
      orderBy: { createdAt: "desc" },
    });

    return responses;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching responses");
  }
}

export async function submitResponse(formId: string, content: string) {
  try {
    const form = await prisma.form.findUnique({ where: { id: formId } });

    if (!form) throw new Error("Form not found");
    if (!form.isAccepting) throw new Error("Form is not accepting responses");

    const response = await prisma.response.create({
      data: {
        formId,
        content,
      },
    });

    await prisma.form.update({
      where: { id: formId },
      data: { submissions: form.submissions + 1 },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error submitting response");
  }
}
