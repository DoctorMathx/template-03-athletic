"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatMoney, discountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";
import { QuickViewModal } from "@/components/product/quick-view-modal";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const images = product.images.length > 0 ? product.images : ["/images/placeholder-product.jpg"];
  const activeImg = hovered && images.length > 1 ? images[1] : images[0];

  const badge = !product.inStock
    ? { label: "Sold Out", variant: "soldout" as const }
    : product.isSale && product.compareAtPrice
    ? { label: "Sale", variant: "sale" as const }
    : product.isNew
    ? { label: "New", variant: "new" as const }
    : product.isBestSeller
    ? { label: "Best Seller", variant: "bestseller" as const }
    : null;

  const quickVariant = product.variants.find((v) => v.stock > 0) ?? product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, quickVariant.id);
    showToast(`${product.title} added to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className={cn("group flex flex-col")}>
        {/* Image */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-neutral-100"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Link href={`/products/${product.slug}`} className="block absolute inset-0">
            <Image
              src={activeImg}
              alt={product.title}
              fill
              priority={rank !== undefined && rank <= 4}
              className="object-cover object-top transition-opacity duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>

          {/* Rank badge */}
          {rank !== undefined && (
            <div className="absolute top-0 left-0 bg-black text-white text-[11px] font-black w-8 h-8 flex items-center justify-center z-10">
              {rank}
            </div>
          )}

          {/* Status badge */}
          {badge && !rank && (
            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              <Badge label={badge.label} variant={badge.variant} />
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-100"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={14}
              className={cn("transition-colors", wishlisted ? "fill-black text-black" : "text-black")}
            />
          </button>

          {/* Quick View — desktop */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-12 inset-x-0 z-10 bg-white/90 text-black text-[10px] font-bold tracking-[0.14em] uppercase py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-white hidden sm:block"
          >
            Quick View
          </button>

          {/* Quick Add */}
          {product.inStock && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-0 inset-x-0 z-10 bg-black text-white text-[10px] font-bold tracking-[0.16em] uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-neutral-800"
            >
              Quick Add
            </button>
          )}
        </div>

        {/* Info */}
        <div className="pt-3 flex flex-col gap-1">
          {product.brand && (
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-neutral-400">{product.brand}</p>
          )}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-[13px] font-semibold text-black leading-snug hover:text-neutral-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-center gap-2 mt-0.5">
            <span className={cn("text-[13px] font-bold", product.compareAtPrice && "text-red-600")}>
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-[12px] text-neutral-400 line-through">{formatMoney(product.compareAtPrice)}</span>
                <span className="text-[10px] font-bold text-red-600">-{discountPercent(product.price, product.compareAtPrice)}%</span>
              </>
            )}
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
