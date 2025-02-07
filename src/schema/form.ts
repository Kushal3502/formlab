import z from "zod";

export const formSchema = z.object({
  title: z.string().min(4, "Atleast 4 characters long"),
  description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
