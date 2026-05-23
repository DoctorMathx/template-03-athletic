"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { products } from "@/mock/products";
import { ProductCard } from "@/components/product/product-card";

type SortOption = "relevance" | "price-asc" | "price-desc" | "newest";

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    let filtered = q
      ? products.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.categoryId.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        )
      : [...products];

    if (genderFilter !== "all") {
      filtered = filtered.filter((p) => p.gender === genderFilter || p.gender === "unisex");
    }

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price.amount - b.price.amount);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price.amount - a.price.amount);
      case "newest":
        return [...filtered].sort((a) => (a.isNew ? -1 : 1));
      default:
        return filtered;
    }
  }, [query, sort, genderFilter]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, categories..."
          className="w-full pl-12 pr-4 py-4 text-[15px] border border-neutral-200 focus:border-black focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      {/* Header + filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-neutral-100 pb-5">
        <p className="text-[13px] text-neutral-500">
          {query ? (
            <>
              <span className="font-bold text-black">{results.length}</span> results for &ldquo;{query}&rdquo;
            </>
          ) : (
            <><span className="font-bold text-black">{results.length}</span> products</>
          )}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Gender filter */}
          <div className="flex gap-1">
            {["all", "women", "men"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 h-8 text-[11px] font-bold tracking-[0.08em] uppercase transition-colors ${
                  genderFilter === g ? "bg-black text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-8 px-3 text-[11px] font-semibold border border-neutral-200 focus:outline-none focus:border-black transition-colors bg-white"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[18px] font-bold mb-3">No results found</p>
          <p className="text-[14px] text-neutral-400">
            Try a different search term or browse our{" "}
            <a href="/collections/new-arrivals" className="underline hover:text-black transition-colors">
              new arrivals
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24"><p className="text-neutral-400">Loading...</p></div>}>
      <SearchResults />
    </Suspense>
  );
}
