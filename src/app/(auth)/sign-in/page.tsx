import { Button } from "@/components/ui/button";
import SignInForm from "@/features/auth/components/sign-in-form";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="w-full max-w-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="size-4" /> <span>Back to Home</span>
      </Link>
      <div className="bg-secondary/50 flex rounded-xl p-1 mb-8">
        <Button variant="secondary" asChild>
          <Link href="/sign-in" className="w-1/2">
            Sign In
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link
            href="/sign-up"
            className="w-1/2 text-muted-foreground hover:text-white transition-colors"
          >
            Create Account
          </Link>
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="mb-1 text-lg font-medium">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your StoreDock account
        </p>
      </div>
      <SignInForm />
      <p className="text-muted-foreground text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-accent hover:underline">
          Create one free
        </Link>
      </p>
    </section>
  );
}
