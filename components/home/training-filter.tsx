"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";
import { trainingCategories } from "@/mock/navigation";
import { getProductsByIds } from "@/mock/products";

export function TrainingFilter() {
  const [active, setActive] = useState(trainingCategories[0].id);
  const current = trainingCategories.find((c) => c.id === active)!;
  const products = getProductsByIds(current.productIds);

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/40 mb-3">Curated for you</p>
          <h2 className="text-[clamp(22px,2.5vw,32px)] font-black tracking-[-0.01em] uppercase text-white">
            How Do You Train?
          </h2>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {trainingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-5 h-10 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors border",
                active === cat.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
          {products.map((product) => (
            <div key={product.id} className="[&_.text-black]:text-white [&_.text-neutral-400]:text-white/40 [&_.text-neutral-600]:text-white/70 [&_.hover\\:text-neutral-600]:hover:text-white/70 [&_.bg-neutral-100]:bg-white/10">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
