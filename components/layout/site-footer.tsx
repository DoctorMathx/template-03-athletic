"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Women", href: "/collections/shop-women" },
    { label: "Men", href: "/collections/shop-men" },
    { label: "Accessories", href: "/collections/accessories" },
    { label: "Sale", href: "/collections/sale" },
  ],
  Help: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
    { label: "Order Tracking", href: "/track" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Store Locations", href: "/stores" },
  ],
};

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-[#0a0a0a] text-white mt-24">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-white mb-1">Stay in the loop</p>
            <p className="text-[13px] text-white/50">Get early access to drops, training tips and exclusive offers.</p>
          </div>
          {submitted ? (
            <p className="text-[13px] font-semibold text-green-400 tracking-wide">You&apos;re in. Welcome to the squad.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex gap-0 w-full md:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 md:w-72 bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-[13px] px-4 py-3 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-3 hover:bg-neutral-200 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand col */}
        <div className="col-span-2 md:col-span-2">
          <Link href="/" className="text-[20px] font-black tracking-[0.22em] uppercase inline-block mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Finstore
          </Link>
          <p className="text-[13px] text-white/50 leading-relaxed mb-6 max-w-xs">
            Performance activewear for every rep, run and rest day. Built for movement, made to last.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-[12px] text-white/40">
              <MapPin size={13} className="shrink-0 mt-0.5" />
              <span>12 Admiralty Way, Lekki Phase 1,<br />Lagos, Nigeria.</span>
            </li>
            <li className="flex items-center gap-2.5 text-[12px] text-white/40">
              <Phone size={13} className="shrink-0" />
              <a href="tel:+2348000000000" className="hover:text-white transition-colors">+234 800 000 0000</a>
            </li>
            <li className="flex items-center gap-2.5 text-[12px] text-white/40">
              <Mail size={13} className="shrink-0" />
              <a href="mailto:hello@finstore.africa" className="hover:text-white transition-colors">hello@finstore.africa</a>
            </li>
          </ul>
          {/* Social */}
          <div className="flex items-center gap-3 mt-6">
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
            </a>
            {/* TikTok */}
            <a href="#" aria-label="TikTok" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.2.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2C23.3 9.2 23 7 23 7zM9.7 15.5V8.3l8.1 3.6-8.1 3.6z"/></svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white mb-5">{heading}</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">© {new Date().getFullYear()} Finstore. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <Link key={l} href="#" className="text-[11px] text-white/30 hover:text-white/70 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
