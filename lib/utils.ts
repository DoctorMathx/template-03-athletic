import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Money } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(money: Money): string {
  const symbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
  };
  const symbol = symbols[money.currency] ?? money.currency;
  if (money.currency === "NGN") {
    return `${symbol}${money.amount.toLocaleString("en-NG")}`;
  }
  return `${symbol}${money.amount.toFixed(2)}`;
}

export function discountPercent(price: Money, compareAt: Money): number {
  return Math.round(((compareAt.amount - price.amount) / compareAt.amount) * 100);
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
