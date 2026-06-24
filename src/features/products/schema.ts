import { z } from "zod";

const ProductStatuses = ["InStock", "LowStock", "OutOfStock"] as const;

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  sku: z.string().min(1, "SKU is required."),
  price: z.coerce.number().int().min(0),
  stock: z.coerce.number().int().min(0),
  status: z.enum(ProductStatuses),
  shelveId: z.string(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
