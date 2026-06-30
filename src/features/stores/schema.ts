import { z } from "zod";

export const StoreTypes = [
  "Grocery",
  "Pet",
  "Toy",
  "Vape",
  "Electronics",
  "Custom",
] as const;

export const storeSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  type: z.enum(StoreTypes),
  shelves: z
    .array(
      z.object({
        name: z.string(),
        lowStockThreshold: z.number(),
      }),
    )
    .optional(),
});

export type StoreFormValues = z.infer<typeof storeSchema>;
export type StoreType = (typeof StoreTypes)[number];
