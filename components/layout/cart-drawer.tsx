"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/mock/products";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.75} />
            <span className="text-[14px] font-bold tracking-[0.06em] uppercase">
              Your Bag
              {count > 0 && <span className="ml-2 text-neutral-400 font-normal">({count})</span>}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-neutral-300" />
              <p className="text-[14px] font-semibold text-black">Your bag is empty</p>
              <p className="text-[13px] text-neutral-400">Add some items to get started.</p>
              <button
                onClick={closeCart}
                className="mt-2 text-[12px] font-bold tracking-[0.12em] uppercase underline underline-offset-4 hover:text-neutral-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const variant = product?.variants.find((v) => v.id === item.variantId);
                if (!product) return null;
                const img = product.images[0] || "/images/placeholder-product.jpg";

                return (
                  <li key={`${item.productId}-${item.variantId}`} className="flex gap-4 px-6 py-5">
                    <Link href={`/products/${product.slug}`} onClick={closeCart} className="shrink-0">
                      <div className="relative w-20 h-24 bg-neutral-100 overflow-hidden">
                        <Image src={img} alt={product.title} fill className="object-cover object-top" sizes="80px" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <Link href={`/products/${product.slug}`} onClick={closeCart}>
                        <p className="text-[13px] font-semibold text-black leading-snug hover:text-neutral-600 transition-colors line-clamp-2">
                          {product.title}
                        </p>
                      </Link>
                      {variant && (
                        <p className="text-[11px] text-neutral-400">
                          {variant.name}: {variant.value}
                        </p>
                      )}
                      <p className="text-[13px] font-bold text-black mt-auto">
                        {formatMoney({ amount: product.price.amount * item.quantity, currency: product.price.currency })}
                      </p>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-0 border border-neutral-200 w-fit mt-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-[13px] font-semibold border-x border-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-neutral-100 transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="self-start mt-0.5 text-neutral-400 hover:text-black transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-neutral-500">Subtotal</span>
              <span className="text-[15px] font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-neutral-400">Shipping and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase text-center py-4 hover:bg-neutral-800 transition-colors"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-black text-black text-[12px] font-bold tracking-[0.14em] uppercase text-center py-3.5 hover:bg-neutral-50 transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
