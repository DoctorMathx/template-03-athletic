"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "top-rated";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function CollectionClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(300000);
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const filtered = useMemo(() => {
    let result = [...products];

    if (genderFilter !== "all") {
      result = result.filter((p) => p.gender === genderFilter || p.gender === "unisex");
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.value) && v.stock > 0)
      );
    }

    result = result.filter((p) => p.price.amount <= priceMax);

    switch (sort) {
      case "newest":
        return result.sort((a) => (a.isNew ? -1 : 1));
      case "price-asc":
        return result.sort((a, b) => a.price.amount - b.price.amount);
      case "price-desc":
        return result.sort((a, b) => b.price.amount - a.price.amount);
      case "top-rated":
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [products, sort, selectedSizes, priceMax, genderFilter]);

  const activeFilterCount =
    selectedSizes.length +
    (priceMax < 300000 ? 1 : 0) +
    (genderFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceMax(300000);
    setGenderFilter("all");
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase hover:text-neutral-500 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-black transition-colors"
            >
              <X size={11} /> Clear all
            </button>
          )}

          <p className="text-[13px] text-neutral-400 hidden sm:block">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="h-9 px-3 text-[12px] font-semibold border border-neutral-200 focus:outline-none focus:border-black transition-colors bg-white"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="top-rated">Top Rated</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside
          className={cn(
            "shrink-0 transition-all duration-300 overflow-hidden",
            filtersOpen ? "w-56 opacity-100" : "w-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="w-56 space-y-8 pr-4">
            {/* Gender */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3">Gender</p>
              <div className="space-y-2">
                {["all", "women", "men", "unisex"].map((g) => (
                  <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={genderFilter === g}
                      onChange={() => setGenderFilter(g)}
                      className="accent-black w-3.5 h-3.5"
                    />
                    <span className="text-[13px] capitalize group-hover:text-neutral-600 transition-colors">
                      {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3">Size</p>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={cn(
                      "w-10 h-10 text-[11px] font-semibold border transition-colors",
                      selectedSizes.includes(size)
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 text-black hover:border-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3">
                Max Price: <span className="font-normal normal-case tracking-normal">₦{priceMax.toLocaleString("en-NG")}</span>
              </p>
              <input
                type="range"
                min={15000}
                max={300000}
                step={5000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-black"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>₦15,000</span>
                <span>₦300,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[15px] font-semibold mb-2">No products match your filters</p>
              <button
                onClick={clearFilters}
                className="text-[13px] underline underline-offset-2 text-neutral-500 hover:text-black transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
