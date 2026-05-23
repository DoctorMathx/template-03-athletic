"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">Get In Touch</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.02em] uppercase">Contact Us</h1>
        <p className="text-[14px] text-neutral-500 mt-3 max-w-md">
          Our team is here to help. We usually respond within 4 hours during business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-[18px] font-bold mb-2">Message Sent!</h2>
              <p className="text-[13px] text-neutral-500">We&apos;ll get back to you within 4 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  required
                  className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors bg-white"
                >
                  <option value="" disabled>Select a subject</option>
                  <option>Order Issue</option>
                  <option>Return / Exchange</option>
                  <option>Product Question</option>
                  <option>Sizing Help</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help you?"
                  className="w-full border border-neutral-200 px-4 py-3.5 text-[13px] focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-10 py-4 hover:bg-neutral-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="bg-neutral-50 p-6">
            <h2 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-6">Contact Info</h2>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold">Address</p>
                  <p className="text-[12px] text-neutral-500">12 Admiralty Way, Lekki Phase 1,<br />Lagos, Nigeria</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold">Phone</p>
                  <a href="tel:+2348000000000" className="text-[12px] text-neutral-500 hover:text-black transition-colors">+234 800 000 0000</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold">Email</p>
                  <a href="mailto:hello@finstore.africa" className="text-[12px] text-neutral-500 hover:text-black transition-colors">hello@finstore.africa</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold">Business Hours</p>
                  <p className="text-[12px] text-neutral-500">Mon–Fri: 9 AM – 6 PM WAT<br />Sat: 10 AM – 4 PM WAT</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-black text-white p-6">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/60 mb-2">Need it faster?</p>
            <p className="text-[14px] font-bold mb-1">Live Chat</p>
            <p className="text-[12px] text-white/60 mb-4">Chat with our team for instant support during business hours.</p>
            <button className="text-[11px] font-bold tracking-[0.12em] uppercase border border-white/40 px-5 py-2.5 hover:border-white transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
