"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { StoreFormValues, storeSchema, StoreType } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { STORE_DATA } from "../constants";
import { createStore } from "../actions";
import { toast } from "sonner";

interface CreateStoreFormProps {
  setAddStoreOpen: (v: boolean) => void;
}

export default function CreateStoreForm({
  setAddStoreOpen,
}: CreateStoreFormProps) {
  const [step, setStep] = useState<0 | 1>(0);
  const [shelves, setShelves] = useState<{ name: string }[]>([]);
  const [newShelf, setNewShelf] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      type: "Custom",
    },
  });

  // Select Store Type e.g, Grocery, Pet
  const handleTypeStore = (type: StoreType) => {
    setValue("type", type);

    const templateShelves = STORE_DATA.find((s) => s.type === type);

    setShelves(
      templateShelves?.shelves
        ? templateShelves.shelves.map((s) => ({ ...s }))
        : [],
    );
    setStep(1);
  };

  // Add Shelf Input
  const addShelf = () => {
    if (!newShelf.trim()) return;

    const exists = shelves.some(
      (s) => s.name.toLowerCase() === newShelf.trim().toLowerCase(),
    );

    if (exists) return;

    setShelves((prev) => [...prev, { name: newShelf.trim() }]);

    setNewShelf("");
  };

  // Send Data
  const onSubmit = async (data: StoreFormValues) => {
    const payload = {
      ...data,
      shelves: shelves ?? [],
    };

    await createStore(payload);

    reset();
    setAddStoreOpen(false);
    toast.success(`${data.name} store has been created`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-sidebar/50 backdrop-blur-sm"
        onClick={() => setAddStoreOpen(false)}
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-3xl rounded-xl bg-background border shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          {/* FIX 3: Dynamic Header Title */}
          <h2 className="text-lg font-semibold">
            {step === 0 ? "Choose Store Type" : "Store Details"}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAddStoreOpen(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {step === 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {STORE_DATA.map((s) => {
                const Icon = s.icon;

                return (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => handleTypeStore(s.type)}
                    className="bg-card rounded-xl p-4 border text-left space-y-2 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className={`${s.styles} w-fit p-2 rounded-full`}>
                      <Icon className="size-5" />
                    </div>

                    <h3 className="font-semibold text-sm">{s.label}</h3>

                    <p className="text-muted-foreground text-xs">
                      {s.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <>
              <div className="space-y-4">
                {/* Store Name */}
                <Field>
                  <FieldLabel htmlFor="name">Store Name</FieldLabel>
                  <Input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="e.g., Downtown Market"
                  />
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </Field>
                {/* Store Address */}
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    type="text"
                    id="address"
                    {...register("address")}
                    placeholder="e.g., 123 Main St, City, State"
                  />
                  {errors.address?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </Field>
                {/* Shelves Display */}
                <Field>
                  <FieldLabel>
                    Shelves{" "}
                    <span className="block text-muted-foreground">
                      ({shelves.length})
                    </span>
                  </FieldLabel>

                  <div className="max-h-60 overflow-y-auto scrollbar scrollbar-thumb-secondary scrollbar-track-sidebar flex flex-col gap-2">
                    {shelves.map((shelf, index) => (
                      <div
                        key={`${shelf.name}-${index}`}
                        className="bg-card rounded-md flex items-center justify-between border px-3 py-1"
                      >
                        <p>{shelf.name}</p>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setShelves((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <X />
                        </Button>
                      </div>
                    ))}
                    {shelves.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No shelves yet. Add your first one.
                      </p>
                    )}
                  </div>
                </Field>
              </div>
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-2">
                  {/* Add Shelf */}
                  <Input
                    placeholder="New shelf name..."
                    value={newShelf}
                    onChange={(e) => setNewShelf(e.target.value)}
                  />
                  <Button type="button" onClick={() => addShelf()}>
                    <Plus />
                  </Button>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep(0)}
                  >
                    Go Back
                  </Button>
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Creating Store..." : "Create Store"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
