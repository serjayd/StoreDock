export type TTier = {
  id: "free" | "premium";
  priceId: string | null;
  label: string;
  value: string;
  valueLabel: string;
  description: string;
  items: string[];
  buttonText: string;
  buttonActiveSubscriptionText: string;
  isSelected: boolean;
  isPopular?: boolean;
};
