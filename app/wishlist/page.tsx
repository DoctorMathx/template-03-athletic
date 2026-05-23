"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

export default function WishlistPage() {
  const { items } = useWishlist();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="mb-10">
        <h1 className="text-[clamp(24px,3vw,36px)] font-black tracking-[-0.02em] uppercase">
          Wishlist
          {items.length > 0 && (
            <span className="ml-3 text-neutral-400 font-normal normal-case text-[16px]">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <Heart size={56} strokeWidth={1} className="text-neutral-200" />
          <p className="text-[18px] font-bold text-black">Your wishlist is empty</p>
          <p className="text-[14px] text-neutral-400 max-w-xs">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link
            href="/collections/new-arrivals"
            className="mt-2 inline-flex items-center gap-2 bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-neutral-800 transition-colors"
          >
            Discover New Arrivals <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
