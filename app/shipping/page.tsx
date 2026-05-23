import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "All you need to know about shipping, delivery times, and our returns policy.",
};

const shippingRates = [
  { method: "Standard Shipping", time: "5–7 business days", cost: "₦15,000", note: "Free on orders over ₦112,500" },
  { method: "Express Shipping", time: "2–3 business days", cost: "₦30,000", note: "" },
  { method: "Overnight", time: "Next business day", cost: "₦52,500", note: "Order before 12 PM" },
  { method: "International", time: "7–14 business days", cost: "From ₦22,500", note: "Free on orders over ₦225,000" },
];

export default function ShippingPage() {
  return (
    <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">Info</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.02em] uppercase">Shipping & Returns</h1>
      </div>

      {/* Shipping */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">Shipping Rates & Times</h2>
        <div className="border border-neutral-100 overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.1em] uppercase">Method</th>
                <th className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.1em] uppercase">Delivery Time</th>
                <th className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.1em] uppercase">Cost</th>
                <th className="text-left px-4 py-3 font-bold text-[11px] tracking-[0.1em] uppercase hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.map((row, i) => (
                <tr key={row.method} className={i < shippingRates.length - 1 ? "border-b border-neutral-100" : ""}>
                  <td className="px-4 py-4 font-semibold">{row.method}</td>
                  <td className="px-4 py-4 text-neutral-600">{row.time}</td>
                  <td className="px-4 py-4 font-bold">{row.cost}</td>
                  <td className="px-4 py-4 text-neutral-400 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-neutral-400 mt-4">
          All orders are processed within 1–2 business days. You&apos;ll receive a shipping confirmation with a tracking number once your order has shipped.
        </p>
      </section>

      {/* Returns */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">Returns Policy</h2>
        <div className="space-y-4 text-[13px] text-neutral-700 leading-relaxed">
          <p>We want you to love your Finstore order. If something&apos;s not right, here&apos;s how returns work:</p>
          <ul className="space-y-2 list-none">
            {[
              "Returns accepted within 30 days of delivery",
              "Items must be unworn, unwashed and have original tags attached",
              "Sale items are final sale and cannot be returned",
              "Swimwear and underwear cannot be returned for hygiene reasons",
              "Returns are free — we&apos;ll email you a prepaid shipping label",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-black font-bold mt-0.5">—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to return */}
      <section className="mb-14">
        <h2 className="text-[14px] font-bold tracking-[0.1em] uppercase mb-6 pb-3 border-b border-neutral-100">How to Return</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Start in your account", desc: "Log in, go to Orders, and select Return Items next to the order." },
            { step: "2", title: "Print your label", desc: "We'll email you a prepaid return shipping label within 1 business day." },
            { step: "3", title: "Drop it off", desc: "Pack your items securely and drop them at any courier drop-off point." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <div className="w-8 h-8 bg-black text-white text-[13px] font-black flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-[13px] font-bold mb-1">{s.title}</p>
                <p className="text-[12px] text-neutral-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-neutral-50 p-6 text-center">
        <p className="text-[13px] text-neutral-600 mb-3">Still have questions?</p>
        <Link href="/contact" className="text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-2 hover:text-neutral-500 transition-colors">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
