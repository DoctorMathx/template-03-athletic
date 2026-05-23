"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/mock/products";
import { formatMoney } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

const suggestedProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="text-[clamp(24px,3vw,36px)] font-black tracking-[-0.02em] uppercase mb-10">
        Your Bag {items.length > 0 && <span className="text-neutral-400 font-normal normal-case text-[16px]">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>}
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <ShoppingBag size={56} strokeWidth={1} className="text-neutral-200" />
          <p className="text-[18px] font-bold text-black">Your bag is empty</p>
          <p className="text-[14px] text-neutral-400 max-w-xs">Looks like you haven&apos;t added anything yet. Let&apos;s fix that.</p>
          <Link
            href="/collections/new-arrivals"
            className="mt-2 inline-flex items-center gap-2 bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-neutral-800 transition-colors"
          >
            Shop New Arrivals <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
          {/* Items */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-2">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-400">Product</p>
              <div className="hidden sm:flex items-center gap-16 text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-400">
                <span>Size</span>
                <span>Qty</span>
                <span>Total</span>
              </div>
            </div>

            <ul className="divide-y divide-neutral-100">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const variant = product?.variants.find((v) => v.id === item.variantId);
                if (!product) return null;
                const img = product.images[0] || "/images/placeholder-product.jpg";

                return (
                  <li key={`${item.productId}-${item.variantId}`} className="flex gap-5 py-6">
                    <Link href={`/products/${product.slug}`} className="shrink-0">
                      <div className="relative w-24 h-[120px] sm:w-28 sm:h-[140px] bg-neutral-100 overflow-hidden">
                        <Image src={img} alt={product.title} fill className="object-cover object-top" sizes="112px" />
                      </div>
                    </Link>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex flex-col gap-1 max-w-xs">
                        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-neutral-400">{product.brand}</p>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-[14px] font-semibold text-black leading-snug hover:text-neutral-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        {variant && (
                          <p className="text-[12px] text-neutral-400">
                            {variant.name}: {variant.value}
                          </p>
                        )}
                        <p className="text-[13px] font-bold text-black sm:hidden mt-1">
                          {formatMoney({ amount: product.price.amount * item.quantity, currency: product.price.currency })}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 sm:gap-12">
                        {/* Quantity */}
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-9 h-9 flex items-center justify-center text-[13px] font-semibold border-x border-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Total — desktop */}
                        <span className="hidden sm:block text-[14px] font-bold w-16 text-right">
                          {formatMoney({ amount: product.price.amount * item.quantity, currency: product.price.currency })}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-neutral-400 hover:text-black transition-colors"
                          aria-label="Remove"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={clearCart}
              className="mt-4 text-[11px] text-neutral-400 hover:text-black transition-colors underline underline-offset-2"
            >
              Clear bag
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-neutral-100 p-6">
              <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase mb-6">Order Summary</h2>

              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className={shipping === 0 ? "font-semibold text-green-600" : "font-semibold"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-neutral-400">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-neutral-100 mt-5 pt-5 flex justify-between text-[15px] font-bold">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo code */}
              <div className="mt-5">
                <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black mb-2">Promo Code</p>
                <div className="flex gap-0">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-neutral-200 px-3 py-2.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                  <button className="bg-black text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 hover:bg-neutral-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase text-center py-4 hover:bg-neutral-800 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-[10px] text-neutral-400">🔒 Secure checkout</span>
                <span className="text-[10px] text-neutral-400">Free returns</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* You may also like */}
      <div className="mt-20 border-t border-neutral-100 pt-16">
        <h2 className="text-[clamp(18px,2vw,26px)] font-black tracking-[-0.01em] uppercase mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {suggestedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
