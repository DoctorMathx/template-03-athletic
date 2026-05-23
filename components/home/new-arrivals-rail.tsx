"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import { getNewArrivals } from "@/mock/products";
import { ArrowRight } from "lucide-react";

type Tab = "women" | "men";

export function NewArrivalsRail() {
  const [tab, setTab] = useState<Tab>("women");
  const items = getNewArrivals(tab, 4);

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-baseline gap-6">
            <h2 className="text-[clamp(20px,2.2vw,28px)] font-black tracking-[-0.01em] uppercase text-black shrink-0">
              New Arrivals
            </h2>
            <div className="flex gap-1">
              {(["women", "men"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-4 h-8 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors",
                    tab === t ? "bg-black text-white" : "text-neutral-400 hover:text-black"
                  )}
                >
                  {t === "women" ? "Women" : "Men"}
                </button>
              ))}
            </div>
          </div>
          <Link
            href={`/collections/${tab === "women" ? "shop-women" : "shop-men"}`}
            className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] uppercase text-black hover:text-neutral-500 transition-colors"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={`/collections/${tab === "women" ? "shop-women" : "shop-men"}`}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] uppercase border border-black px-8 h-11 hover:bg-black hover:text-white transition-colors"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
