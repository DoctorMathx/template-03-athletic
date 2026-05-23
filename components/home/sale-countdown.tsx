"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-black text-white text-[clamp(28px,4vw,52px)] font-black leading-none tabular-nums w-[clamp(52px,7vw,88px)] flex items-center justify-center py-3">
        {pad(value)}
      </div>
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black/50">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="text-[clamp(24px,3.5vw,44px)] font-black text-black/30 leading-none self-start pt-1">:</span>;
}

const SALE_END = new Date("2026-06-15T04:00:00.000Z");

export function SaleCountdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(SALE_END));
    const t = setInterval(() => setTime(getTimeLeft(SALE_END)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[#f5f5f0] border-t border-b border-neutral-200 py-14 lg:py-20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-black/40 mb-3">Limited Time</p>
        <h2 className="text-[clamp(26px,3.5vw,42px)] font-black tracking-[-0.01em] uppercase text-black mb-2">
          Mid-Season Sale — Up to 50% Off
        </h2>
        <p className="text-[14px] text-black/50 mb-10">Selected styles only. Don&apos;t sleep on it.</p>

        {/* Timer — only render after hydration to avoid SSR mismatch */}
        <div className="flex items-start justify-center gap-3 sm:gap-5 mb-10">
          {mounted ? (
            <>
              <Digit value={time.d} label="Days" />
              <Separator />
              <Digit value={time.h} label="Hours" />
              <Separator />
              <Digit value={time.m} label="Min" />
              <Separator />
              <Digit value={time.s} label="Sec" />
            </>
          ) : (
            <>
              <Digit value={0} label="Days" />
              <Separator />
              <Digit value={0} label="Hours" />
              <Separator />
              <Digit value={0} label="Min" />
              <Separator />
              <Digit value={0} label="Sec" />
            </>
          )}
        </div>

        <Link
          href="/collections/sale"
          className="inline-flex items-center justify-center bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-10 h-12 hover:bg-neutral-800 transition-colors"
        >
          Shop the Sale
        </Link>
      </div>
    </section>
  );
}
