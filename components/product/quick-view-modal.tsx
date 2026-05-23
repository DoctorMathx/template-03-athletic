"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatMoney, discountPercent, cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { StarRating } from "@/components/ui/star-rating";

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.stock > 0) ?? product.variants[0]
  );
  const [added, setAdded] = useState(false);

  const images = product.images.length > 0 ? product.images : ["/images/placeholder-product.jpg"];

  const handleAdd = () => {
    addItem(product.id, selectedVariant.id);
    showToast(`${product.title} added to bag`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[780px] max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white text-neutral-500 hover:text-black transition-colors shadow"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-neutral-100">
            <Image
              src={images[0]}
              alt={product.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 390px"
            />
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-neutral-400 mb-1">
                {product.brand}
              </p>
              <h2 className="text-[18px] font-bold text-black leading-snug">{product.title}</h2>
            </div>

            <StarRating rating={product.rating} reviewCount={product.reviewCount} />

            <div className="flex items-center gap-2">
              <span className={cn("text-[16px] font-bold", product.compareAtPrice && "text-red-600")}>
                {formatMoney(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-[13px] text-neutral-400 line-through">{formatMoney(product.compareAtPrice)}</span>
                  <span className="text-[11px] font-bold text-red-600">
                    -{discountPercent(product.price, product.compareAtPrice)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-[13px] text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Size selector */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black mb-2">
                Size: <span className="font-normal normal-case tracking-normal">{selectedVariant.value}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    className={cn(
                      "w-10 h-10 text-[12px] font-semibold border transition-colors",
                      v.id === selectedVariant.id
                        ? "border-black bg-black text-white"
                        : v.stock === 0
                        ? "border-neutral-200 text-neutral-300 line-through cursor-not-allowed"
                        : "border-neutral-200 text-black hover:border-black"
                    )}
                  >
                    {v.value}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={cn(
                "w-full py-4 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors mt-auto",
                product.inStock
                  ? added
                    ? "bg-neutral-700 text-white"
                    : "bg-black text-white hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              )}
            >
              {!product.inStock ? "Sold Out" : added ? "Added to Bag ✓" : "Add to Bag"}
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-center text-[12px] text-neutral-500 hover:text-black transition-colors underline underline-offset-2"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
