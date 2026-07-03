"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Laptop, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordFormValues, passwordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/lib/auth-client";
import { toast } from "sonner";
import { TSessionFull } from "@/types/user";

interface UserSecurityProps {
  sessions: TSessionFull[];
}

export default function UserSecurity({ sessions }: UserSecurityProps) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<passwordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: passwordFormValues) => {
    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (result.error) {
      toast.error(result.error.message || "Failed to update password");
      return;
    }
    reset();
    toast.success("Password updated successfully");
  };

  function formatDevice(ua: string | null) {
    if (!ua) return "Unknown device";

    if (ua.includes("Chrome")) {
      if (ua.includes("Mac")) return "Chrome on macOS";
      if (ua.includes("Windows")) return "Chrome on Windows";
    }

    if (ua.includes("Safari")) return "Safari on macOS";

    return "Unknown device";
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <section className="rounded-xl border border-border bg-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="size-5 hidden sm:block" />
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-0.5">
              Change Password
            </h2>
            <p className="text-sm text-muted-foreground">
              Use a strong password with at least 8 characters
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* CURRENT */}
          <Field>
            <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>

            <div className="relative">
              <Input
                type={showPassword.current ? "text" : "password"}
                id="currentPassword"
                placeholder="••••••••"
                {...register("currentPassword")}
              />

              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-8 p-0"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {showPassword.current ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.currentPassword?.message && (
              <p className="text-sm text-chart-5">
                {errors.currentPassword.message}
              </p>
            )}
          </Field>

          {/* NEW */}
          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>

            <div className="relative">
              <Input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                placeholder="••••••••"
                {...register("newPassword")}
              />

              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-8 p-0"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
              >
                {showPassword.new ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.newPassword?.message && (
              <p className="text-sm text-chart-5">
                {errors.newPassword.message}
              </p>
            )}
          </Field>

          {/* CONFIRM */}
          <Field>
            <FieldLabel htmlFor="confirmNewPassword">
              Confirm Password
            </FieldLabel>

            <div className="relative">
              <Input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmNewPassword"
                placeholder="••••••••"
                {...register("confirmNewPassword")}
              />

              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-8 p-0"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
              >
                {showPassword.confirm ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.confirmNewPassword?.message && (
              <p className="text-sm text-chart-5">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </Field>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer"
          >
            {isSubmitting ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
      </section>
      <section className="rounded-xl border border-border bg-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-8">
          <Laptop className="size-5 hidden sm:block" />

          <h2 className="text-sm font-semibold text-foreground mb-0.5">
            Active Sessions
          </h2>
        </div>
        <div className="space-y-3">
          {sessions.map((session, i) => (
            <div
              key={session.id}
              className="group relative rounded-xl border border-border bg-card p-4 transition hover:shadow-md overflow-y-auto"
            >
              {/* top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {formatDevice(session.userAgent)}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {session.ipAddress ?? "Unknown IP"}
                  </p>
                </div>

                {/* badge */}
                {i === 0 && (
                  <span className="shrink-0 rounded-md bg-chart-1/10 px-2 py-1 text-xs text-chart-1">
                    Current
                  </span>
                )}
              </div>

              {/* bottom row */}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Created {formatDate(session.createdAt)}</span>
                <span>Expires {formatDate(session.expiresAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
