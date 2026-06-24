import { z } from "zod";

export const shelfSchema = z.object({
  name: z.string().min(2, "Shelf name must be at least 2 characters."),
});

export type ShelfFormValues = z.infer<typeof shelfSchema>;
