import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
// import { resend } from "./resend";
// import EmailVerification from "@/components/emails/verify-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url }) => {
  //     console.log("📧 sending verification email to:", user.email);
  //     console.log("🔗 verification url:", url);
  //     await resend.emails.send({
  //       from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
  //       to: "serhiinote@gmail.com",
  //       subject: "Verify your email",
  //       react: EmailVerification({ url }),
  //     });
  //   },
  // },
});

// If verification added, change sign up / sign in components so its not transferring to dashboard after sign up until email is verified.
