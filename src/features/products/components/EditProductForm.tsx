"use client";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/products";
import { TShelf } from "@/types/shelves";
import { X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { ProductFormValues, productSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { editProduct } from "../actions";

interface EditProductFormProps {
  product: TProduct;
  shelves: TShelf[];
  onClose: () => void;
}

export default function EditProductForm({
  onClose,
  product,
  shelves,
}: EditProductFormProps) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      shelfId: product.shelfId,
    },
  });

  const shelfId = useWatch({
    control,
    name: "shelfId",
  });

  const onSubmit = async (data: ProductFormValues) => {
    const result = await editProduct(product.id, data);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    onClose();

    toast.success(`Successfully updated product`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-sidebar/50 backdrop-blur-sm"
        onClick={() => onClose()}
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-xl rounded-xl bg-background border shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          {/* FIX 3: Dynamic Header Title */}
          <h2 className="text-lg font-semibold">Edit Product</h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onClose()}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <Field>
            <FieldLabel htmlFor="name">Product Name</FieldLabel>
            <Input
              type="text"
              id="name"
              placeholder="e.g., Coca-Cola 2L"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="sku">SKU</FieldLabel>
            <Input
              type="text"
              id="sku"
              placeholder="e.g., SKU-0001"
              {...register("sku")}
            />
            {errors.sku?.message && (
              <p className="text-sm text-red-500">{errors.sku.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel>Shelf</FieldLabel>

            <Select
              value={shelfId}
              onValueChange={(value) =>
                setValue("shelfId", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Shelf" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {shelves.map((shelf) => (
                    <SelectItem key={shelf.id} value={shelf.id}>
                      {shelf.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.shelfId?.message && (
              <p className="text-sm text-red-500">{errors.shelfId.message}</p>
            )}
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                type="number"
                id="price"
                placeholder="0"
                {...register("price", { valueAsNumber: true })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="stock">Stock</FieldLabel>
              <Input
                type="number"
                id="stock"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => onClose()} type="button">
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              variant="default"
              type="submit"
              className="sm:col-span-2"
            >
              {isSubmitting || !shelfId ? "Adding Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
