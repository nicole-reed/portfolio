import { z } from "zod";

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    image: z.string(),
    order: z.number()
});

export type Project = z.infer<typeof projectSchema>