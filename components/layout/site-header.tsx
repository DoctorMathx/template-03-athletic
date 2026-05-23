"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { navItems } from "@/mock/navigation";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-[18px] font-black tracking-[0.22em] uppercase text-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Finstore
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveNav(item.label)}
                onMouseLeave={() => setActiveNav(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-0.5 px-4 h-16 text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors",
                    item.label === "Sale" ? "text-red-600 hover:text-red-700" : "text-black hover:text-neutral-500",
                    activeNav === item.label && "text-neutral-500"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown size={11} strokeWidth={2.5} className="mt-0.5" />}
                </Link>

                {/* Mega-dropdown */}
                {item.children && activeNav === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-neutral-100 shadow-xl py-6 px-8 min-w-[200px] z-50">
                    <ul className="space-y-3">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="text-[12px] font-medium tracking-[0.04em] text-neutral-700 hover:text-black transition-colors whitespace-nowrap block"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center text-black hover:text-neutral-500 transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.75} />
            </button>
            <Link href="/account" className="w-10 h-10 hidden sm:flex items-center justify-center text-black hover:text-neutral-500 transition-colors" aria-label="Account">
              <User size={18} strokeWidth={1.75} />
            </Link>
            <Link href="/wishlist" className="w-10 h-10 hidden sm:flex items-center justify-center text-black hover:text-neutral-500 transition-colors relative" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="w-10 h-10 flex items-center justify-center text-black hover:text-neutral-500 transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center text-black hover:text-neutral-500 transition-colors lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-neutral-100 bg-white">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
                  if (q) { window.location.href = `/search?q=${encodeURIComponent(q)}`; }
                  setSearchOpen(false);
                }}
                className="relative max-w-xl mx-auto"
              >
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  autoFocus
                  type="text"
                  name="q"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 text-[14px] border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 left-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="h-16 flex items-center px-6 border-b border-neutral-100">
              <Link href="/" className="text-[16px] font-black tracking-[0.22em] uppercase" style={{ fontFamily: "'Georgia', serif" }}>
                Finstore
              </Link>
            </div>
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-6 py-3.5 text-[14px] font-semibold tracking-[0.06em] uppercase border-b border-neutral-50",
                      item.label === "Sale" ? "text-red-600" : "text-black"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="bg-neutral-50">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-10 py-3 text-[13px] text-neutral-600 border-b border-neutral-100 hover:text-black transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
