export type TUser = {
  plan: "free" | "premium";
  image: string | null;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: Date | null;
} | null;

export type TSession = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    token: string;
    userId: string;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
} | null;
