"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/mock/products";
import { formatMoney, cn } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("information");
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0 && !processing) {
    return (
      <div className="max-w-[480px] mx-auto px-4 py-24 text-center">
        <h1 className="text-[20px] font-bold mb-4">Your bag is empty</h1>
        <Link href="/" className="text-[13px] underline underline-offset-2 hover:text-neutral-500 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="text-[20px] font-black tracking-[0.22em] uppercase" style={{ fontFamily: "Georgia, serif" }}>
            Finstore
          </Link>
        </div>

        {/* Breadcrumb steps */}
        <div className="flex items-center justify-center gap-2 text-[12px] mb-10">
          {(["information", "shipping", "payment"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => step !== "information" && setStep(s)}
                className={cn(
                  "capitalize transition-colors",
                  step === s ? "text-black font-bold" : "text-neutral-400 hover:text-black"
                )}
              >
                {s}
              </button>
              {i < 2 && <span className="text-neutral-300">›</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
          {/* Form */}
          <div>
            {/* Mobile order summary toggle */}
            <button
              onClick={() => setOrderSummaryOpen((v) => !v)}
              className="lg:hidden flex items-center justify-between w-full py-4 border-y border-neutral-100 mb-6 text-[13px] font-semibold"
            >
              <span className="flex items-center gap-2">
                {orderSummaryOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {orderSummaryOpen ? "Hide" : "Show"} order summary
              </span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </button>

            {/* Mobile order summary */}
            {orderSummaryOpen && (
              <div className="lg:hidden mb-6 space-y-4">
                {items.map((item) => {
                  const p = products.find((x) => x.id === item.productId);
                  if (!p) return null;
                  return (
                    <div key={item.productId + item.variantId} className="flex gap-3 text-[13px]">
                      <div className="relative w-14 h-16 bg-neutral-100 shrink-0">
                        <Image src={p.images[0] || "/images/placeholder-product.jpg"} alt={p.title} fill className="object-cover object-top" sizes="56px" />
                        <span className="absolute -top-1.5 -right-1.5 bg-neutral-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{p.title}</p>
                      </div>
                      <p className="font-bold">{formatMoney({ amount: p.price.amount * item.quantity, currency: p.price.currency })}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Contact */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase">Contact</h2>
                  <Link href="/account" className="text-[12px] text-neutral-400 hover:text-black transition-colors">
                    Have an account? Log in
                  </Link>
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                />
              </section>

              {/* Shipping address */}
              <section>
                <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase mb-4">Shipping Address</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First name" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                    <input placeholder="Last name" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <input placeholder="Address" required value={form.address} onChange={(e) => update("address", e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                  <input placeholder="Apartment, suite, etc. (optional)" value={form.address2} onChange={(e) => update("address2", e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                  <div className="grid grid-cols-3 gap-3">
                    <input placeholder="City" required value={form.city} onChange={(e) => update("city", e.target.value)}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                    <input placeholder="State" required value={form.state} onChange={(e) => update("state", e.target.value)}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                    <input placeholder="ZIP code" required value={form.zip} onChange={(e) => update("zip", e.target.value)}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                </div>
              </section>

              {/* Shipping method */}
              <section>
                <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase mb-4">Shipping Method</h2>
                <div className="border border-neutral-200 divide-y divide-neutral-100">
                  {[
                    { id: "standard", label: "Standard Shipping", sub: "5–7 business days", price: subtotal >= 75 ? "Free" : "$9.99" },
                    { id: "express", label: "Express Shipping", sub: "2–3 business days", price: "$19.99" },
                    { id: "overnight", label: "Overnight", sub: "Next business day", price: "$34.99" },
                  ].map((method) => (
                    <label key={method.id} className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={form.shippingMethod === method.id}
                          onChange={() => update("shippingMethod", method.id)}
                          className="accent-black w-4 h-4"
                        />
                        <div>
                          <p className="text-[13px] font-semibold">{method.label}</p>
                          <p className="text-[11px] text-neutral-400">{method.sub}</p>
                        </div>
                      </div>
                      <span className="text-[13px] font-bold">{method.price}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase mb-4">Payment</h2>
                <div className="border border-neutral-200 p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] text-neutral-500">All transactions are secure and encrypted.</p>
                    <Lock size={13} className="text-neutral-400" />
                  </div>
                  <input
                    placeholder="Card number"
                    value={form.cardNumber}
                    onChange={(e) => update("cardNumber", e.target.value)}
                    maxLength={19}
                    required
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} required
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                    <input placeholder="CVC" value={form.cardCvc} onChange={(e) => update("cardCvc", e.target.value)} required maxLength={4}
                      className="border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <input placeholder="Name on card" value={form.cardName} onChange={(e) => update("cardName", e.target.value)} required
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors" />
                </div>
              </section>

              <button
                type="submit"
                disabled={processing}
                className={cn(
                  "w-full py-4 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center justify-center gap-2",
                  processing ? "bg-neutral-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-neutral-800"
                )}
              >
                <Lock size={13} />
                {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>

              <p className="text-center text-[11px] text-neutral-400">
                By placing your order you agree to our{" "}
                <Link href="/terms" className="underline hover:text-black transition-colors">Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-black transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          {/* Order summary — desktop */}
          <div className="hidden lg:block">
            <div className="bg-neutral-50 p-6 sticky top-24">
              <h2 className="text-[13px] font-bold tracking-[0.06em] uppercase mb-5">Order Summary</h2>

              <ul className="space-y-5 mb-6">
                {items.map((item) => {
                  const p = products.find((x) => x.id === item.productId);
                  if (!p) return null;
                  return (
                    <li key={item.productId + item.variantId} className="flex gap-3">
                      <div className="relative w-16 h-20 bg-neutral-200 shrink-0 overflow-hidden">
                        <Image src={p.images[0] || "/images/placeholder-product.jpg"} alt={p.title} fill className="object-cover object-top" sizes="64px" />
                        <span className="absolute -top-1.5 -right-1.5 bg-neutral-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center gap-1">
                        <p className="text-[12px] font-semibold leading-tight">{p.title}</p>
                        <p className="text-[11px] text-neutral-400">
                          {p.variants.find((v) => v.id === item.variantId)?.value}
                        </p>
                      </div>
                      <p className="text-[13px] font-bold shrink-0">
                        {formatMoney({ amount: p.price.amount * item.quantity, currency: p.price.currency })}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-neutral-200 pt-4 space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between text-[15px] font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
