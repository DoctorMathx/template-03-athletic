export type Currency = "NGN" | "USD" | "GBP";

export type Money = {
  amount: number;
  currency: Currency;
};

export type ProductVariant = {
  id: string;
  name: string;
  value: string;
  stock: number;
  colorHex?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  description: string;
  images: string[];
  price: Money;
  compareAtPrice?: Money;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  categoryId: string;
  gender: "men" | "women" | "unisex";
  variants: ProductVariant[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  rank?: number; // for bestseller list
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  productIds: string[];
  gender?: "men" | "women" | "unisex";
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: number;
  category: string;
};

export type TrainingCategory = {
  id: string;
  label: string;
  productIds: string[];
};
