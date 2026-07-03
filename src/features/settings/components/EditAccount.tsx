"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TUser } from "@/types/user";
import { LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { userFormValues, userSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUser } from "../actions";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";

interface EditAccountProps {
  user: TUser | null;
}

export default function EditAccount({ user }: EditAccountProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const userLogoTemplate = user?.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const onSubmit = async (data: userFormValues) => {
    const result = await editUser(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(`Successfully updated user`);
  };

  const handleSignout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <section className="rounded-xl border border-border bg-card p-6 mb-4">
        <div>
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <div className="size-14 rounded-lg hidden sm:flex items-center justify-center text-lg bg-chart-1 text-secondary font-semibold shrink-0">
              {user?.image || userLogoTemplate}
            </div>
            <div>
              <h2 className="font-semibold text-lg text-foreground">
                {user?.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                {user?.email}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className={`bg-muted px-3 py-1 rounded-lg font-medium ${user?.plan === "premium" && "text-white/90"}`}
                >
                  {user?.plan === "free" ? "Free" : "Premium"}
                </span>{" "}
                Member since {formattedDate}
              </div>
            </div>
          </div>
        </div>
        {/* Edit User */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-chart-5">{errors.name.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm text-chart-5">{errors.email.message}</p>
            )}
          </Field>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer"
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </section>
      <section className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start justify-between">
        <div className="mb-2 sm:mb-0">
          <h3 className="text-sm font-medium text-foreground">Sign Out</h3>
          <p className="text-sm text-muted-foreground">
            Sign out of StoreDock on this device
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => handleSignout()}
        >
          <LogOut />
          Sign Out
        </Button>
      </section>
    </>
  );
}
