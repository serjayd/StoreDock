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
};

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

export type TSessionFull = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
};
