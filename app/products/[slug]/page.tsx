"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/mock/products";
import { formatMoney, discountPercent, cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Heart, Share2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [shared, setShared] = useState(false);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const images = product.images.length > 0 ? product.images : ["/images/placeholder-product.jpg"];

  const handleAdd = () => {
    addItem(product.id, selectedVariant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: product.title, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setShared(true); setTimeout(() => setShared(false), 2000); }
    } catch { /* cancelled */ }
  };

  const badge = product.isSale && product.compareAtPrice
    ? { label: "Sale", variant: "sale" as const }
    : product.isNew
    ? { label: "New", variant: "new" as const }
    : product.isBestSeller
    ? { label: "Best Seller", variant: "bestseller" as const }
    : null;

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-neutral-400 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/collections/${product.gender === "men" ? "shop-men" : "shop-women"}`} className="hover:text-black transition-colors capitalize">{product.gender}</Link>
        <span>/</span>
        <span className="text-black">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden bg-neutral-100 border-2 transition-colors",
                    activeImg === i ? "border-black" : "border-transparent hover:border-neutral-300"
                  )}
                >
                  <Image src={src} alt={`${product.title} ${i + 1}`} fill className="object-cover object-top" sizes="64px" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image src={images[activeImg]} alt={product.title} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
            {badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge label={badge.label} variant={badge.variant} />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-2">{product.brand}</p>
          )}
          <h1 className="text-[clamp(22px,2.5vw,32px)] font-black tracking-[-0.01em] text-black leading-tight mb-3">
            {product.title}
          </h1>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4 mb-6">
            <span className={cn("text-[20px] font-black", product.compareAtPrice && "text-red-600")}>
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-[16px] text-neutral-400 line-through">{formatMoney(product.compareAtPrice)}</span>
                <span className="text-[12px] font-bold text-red-600 bg-red-50 px-2 py-0.5">
                  -{discountPercent(product.price, product.compareAtPrice)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-[14px] text-neutral-600 leading-relaxed mb-8">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-black">Size — {selectedVariant.value}</p>
              <Link href="/size-guide" className="text-[11px] underline text-neutral-500 hover:text-black transition-colors">Size Guide</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  disabled={v.stock === 0}
                  className={cn(
                    "w-12 h-12 text-[13px] font-bold border-2 transition-colors",
                    selectedVariant.id === v.id
                      ? "border-black bg-black text-white"
                      : v.stock === 0
                      ? "border-neutral-200 text-neutral-300 cursor-not-allowed line-through"
                      : "border-neutral-200 text-black hover:border-black"
                  )}
                >
                  {v.value}
                </button>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAdd}
              disabled={!product.inStock || selectedVariant.stock === 0}
              className={cn(
                "flex-1 h-14 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors",
                added
                  ? "bg-green-600 text-white"
                  : product.inStock && selectedVariant.stock > 0
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              )}
            >
              {added ? "Added to Bag!" : product.inStock && selectedVariant.stock > 0 ? "Add to Bag" : "Sold Out"}
            </button>
            <button
              onClick={() => setWishlisted((v) => !v)}
              className="w-14 h-14 border-2 border-neutral-200 flex items-center justify-center hover:border-black transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} className={wishlisted ? "fill-black text-black" : "text-black"} />
            </button>
            <button
              onClick={handleShare}
              className="w-14 h-14 border-2 border-neutral-200 flex items-center justify-center hover:border-black transition-colors"
              aria-label="Share"
            >
              {shared ? <Check size={18} className="text-green-600" /> : <Share2 size={18} className="text-black" />}
            </button>
          </div>

          <p className="text-[12px] text-neutral-400 mb-6">Free shipping on orders over $75 · Free returns</p>

          {/* Accordion */}
          <div className="border-t border-neutral-100">
            <button
              onClick={() => setDetailsOpen((v) => !v)}
              className="w-full flex items-center justify-between py-4 text-[13px] font-bold tracking-[0.06em] uppercase text-black"
            >
              Product Details
              {detailsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            {detailsOpen && (
              <div className="pb-4 text-[13px] text-neutral-600 leading-relaxed space-y-1">
                <p>• High-performance fabric with four-way stretch</p>
                <p>• Moisture-wicking technology</p>
                <p>• Machine washable at 30°C</p>
                <p>• Body: 87% Polyamide, 13% Elastane</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
