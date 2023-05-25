import { z } from "zod";

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    image: z.string()
});

export type Project = z.infer<typeof projectSchema>