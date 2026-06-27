import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ShelfFormValues, shelfSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addShelf } from "../actions";
import { toast } from "sonner";

interface AddShelfFormProps {
  setAddShelfOpen: (v: boolean) => void;
}

export default function AddShelfForm({ setAddShelfOpen }: AddShelfFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShelfFormValues>({
    resolver: zodResolver(shelfSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: ShelfFormValues) => {
    const result = await addShelf(data);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setAddShelfOpen(false);

    toast.success(`Successfully added shelf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-sidebar/50 backdrop-blur-sm"
        onClick={() => setAddShelfOpen(false)}
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-xl rounded-xl bg-background border shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Add Shelf</h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAddShelfOpen(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              type="text"
              id="name"
              placeholder="e.g., Beverages"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => setAddShelfOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              variant="default"
              type="submit"
              className="sm:col-span-2"
            >
              {isSubmitting ? "Adding Shelf" : "Add Shelf"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
