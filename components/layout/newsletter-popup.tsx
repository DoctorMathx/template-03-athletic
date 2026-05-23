"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("newsletter-dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("newsletter-dismissed", "1");
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[480px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Image strip */}
        <div className="h-3 bg-black" />

        {/* Content */}
        <div className="px-8 py-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-neutral-400 mb-3">
            Join the Squad
          </p>
          <h2 className="text-[28px] font-black tracking-[-0.02em] uppercase text-black leading-tight mb-3">
            10% Off Your<br />First Order
          </h2>
          <p className="text-[13px] text-neutral-500 leading-relaxed mb-8 max-w-xs mx-auto">
            Subscribe to get early access to drops, exclusive training content and member-only offers.
          </p>

          {submitted ? (
            <div className="py-4">
              <p className="text-[14px] font-bold text-black">You&apos;re in! 🎉</p>
              <p className="text-[13px] text-neutral-400 mt-1">Check your inbox for your discount code.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="w-full bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase py-4 hover:bg-neutral-800 transition-colors"
              >
                Get 10% Off
              </button>
            </form>
          )}

          <button
            onClick={dismiss}
            className="mt-5 text-[11px] text-neutral-400 hover:text-black transition-colors underline underline-offset-2"
          >
            No thanks, I&apos;ll pay full price
          </button>
        </div>

        <div className="h-1 bg-black" />
      </div>
    </div>
  );
}
