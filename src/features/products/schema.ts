import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  sku: z.string().min(1, "SKU is required."),
  price: z.number().min(0),
  stock: z.number().int().min(0.0),
  shelfId: z.string().min(1, "Please select a shelf"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
