"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import { getBestsellers } from "@/mock/products";

type Tab = "women" | "men";

export function BestsellerList() {
  const [tab, setTab] = useState<Tab>("women");
  const items = getBestsellers(tab, 8);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-baseline gap-8 mb-10 border-b border-neutral-100 pb-5">
          <h2 className="text-[clamp(20px,2.2vw,28px)] font-black tracking-[-0.01em] uppercase text-black shrink-0">
            Best Sellers
          </h2>
          <div className="flex gap-1">
            {(["women", "men"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 h-8 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors",
                  tab === t ? "bg-black text-white" : "bg-transparent text-neutral-400 hover:text-black"
                )}
              >
                {t === "women" ? "Women" : "Men"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} rank={product.rank} />
          ))}
        </div>
      </div>
    </section>
  );
}
