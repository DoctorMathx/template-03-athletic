import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed" };

export default function OrderSuccessPage() {
  const orderNumber = `FS-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="max-w-[560px] mx-auto px-4 py-24 text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
          <CheckCircle size={30} className="text-white" />
        </div>
      </div>

      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">
        Order Confirmed
      </p>
      <h1 className="text-[clamp(24px,4vw,36px)] font-black tracking-[-0.02em] uppercase mb-4">
        Thank You!
      </h1>
      <p className="text-[14px] text-neutral-600 leading-relaxed mb-2">
        Your order has been placed and is being processed.
        You&apos;ll receive a confirmation email shortly.
      </p>
      <p className="text-[13px] text-neutral-400 mb-10">
        Order number: <span className="font-bold text-black">{orderNumber}</span>
      </p>

      {/* What happens next */}
      <div className="bg-neutral-50 p-6 text-left mb-10">
        <h2 className="text-[12px] font-bold tracking-[0.1em] uppercase mb-4">What Happens Next</h2>
        <ul className="space-y-4">
          {[
            { step: "1", title: "Confirmation email", desc: "We've sent a confirmation to your email address." },
            { step: "2", title: "Packing your order", desc: "Our team will pick and pack your items within 1 business day." },
            { step: "3", title: "Dispatched", desc: "You'll receive a tracking link once your order ships." },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <div className="w-7 h-7 bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div>
                <p className="text-[13px] font-semibold">{item.title}</p>
                <p className="text-[12px] text-neutral-500">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account"
          className="inline-flex items-center justify-center border border-black text-black text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-neutral-50 transition-colors"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
}
