"use server";

import { auth } from "@/auth";
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
