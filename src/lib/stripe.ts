import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY!;

export const STRIPE_PRICE_IDS = {
  premium: "price_1TlQzBKCRdYqMNi3n5Fs7QCw",
} as const;

export type StripePriceId = keyof typeof STRIPE_PRICE_IDS;
