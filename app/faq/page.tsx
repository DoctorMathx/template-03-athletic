"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days. Express shipping (2–3 days) and overnight options are available at checkout. International orders typically arrive within 7–14 days." },
      { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders over $75. International orders over $150 also qualify for free shipping." },
      { q: "Can I track my order?", a: "Absolutely. Once your order ships, you'll receive a tracking link via email. You can also check your order status in your account dashboard." },
      { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placing them. After that, they may have already been processed for packing. Contact us ASAP at hello@finstore.africa." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Sale items are final sale and cannot be returned." },
      { q: "How do I start a return?", a: "Log in to your account, go to Orders, and select 'Return Items' next to the relevant order. You'll receive a prepaid return label by email within 1 business day." },
      { q: "When will I get my refund?", a: "Once we receive and inspect your return, refunds are processed within 3–5 business days to your original payment method." },
      { q: "Can I exchange for a different size?", a: "Yes. Use the same return portal to select 'Exchange' and choose your new size. Exchanges ship free." },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      { q: "How do I find my size?", a: "Check our full size guide at /size-guide. We list measurements in both inches and centimetres. If you're between sizes, we generally recommend sizing up for outerwear and sizing down for compression pieces." },
      { q: "Are your leggings squat-proof?", a: "Yes — all of our seamless and woven leggings are tested for opacity. If you ever receive a pair that isn't up to standard, we'll replace them no questions asked." },
      { q: "How should I care for my activewear?", a: "Wash on a cool/warm cycle (30–40°C), inside-out. Avoid fabric softener — it coats the fibres and reduces moisture-wicking performance. Air dry where possible." },
      { q: "Do you restock sold-out items?", a: "Most items are restocked within 4–8 weeks. Sign up for restock notifications on the product page and we'll email you the moment it's back." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), bank transfers, and USSD payments via Fintava. Apple Pay and Google Pay are available on supported devices." },
      { q: "Is my payment information secure?", a: "Yes. All transactions are encrypted using industry-standard SSL. We never store your full card details — payments are processed securely by Fintava." },
      { q: "Can I pay in Naira?", a: "Yes! We support Naira (₦) payments for Nigerian customers. Your cart will automatically show pricing in your local currency." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-[14px] font-semibold">{q}</span>
        {open ? <ChevronUp size={16} className="shrink-0 text-neutral-400" /> : <ChevronDown size={16} className="shrink-0 text-neutral-400" />}
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-96 pb-5" : "max-h-0")}>
        <p className="text-[13px] text-neutral-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">Help Centre</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.02em] uppercase">Frequently Asked Questions</h1>
        <p className="text-[14px] text-neutral-500 mt-3">Can&apos;t find what you&apos;re looking for? <a href="/contact" className="underline hover:text-black transition-colors">Contact our team</a>.</p>
      </div>

      <div className="space-y-12">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-[12px] font-bold tracking-[0.16em] uppercase mb-1 text-neutral-400 border-b border-neutral-100 pb-3">
              {section.category}
            </h2>
            {section.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
