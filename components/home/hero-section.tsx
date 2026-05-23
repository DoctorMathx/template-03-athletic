import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ minHeight: "clamp(520px, 80vh, 860px)" }}>
      {/* Mobile hero image — shown below sm (< 640px) */}
      <div className="absolute inset-0 sm:hidden">
        <Image
          src="/images/pexels-cesar-o-neill-26650613-29259727.jpg"
          alt="Performance collection — built for movement"
          fill
          priority
          className="object-cover object-top opacity-80"
          sizes="100vw"
        />
      </div>
      {/* Desktop hero image — shown at sm and above (≥ 640px) */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/images/pexels-photo-4908551.jpg"
          alt="Performance collection — built for movement"
          fill
          priority
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="max-w-2xl">
            {/* Label */}
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/70 mb-4">
              New Season Drop
            </p>
            {/* Headline */}
            <h1 className="text-[clamp(44px,6vw,88px)] font-black leading-[0.92] tracking-[-0.02em] uppercase text-white mb-6">
              Built<br />For<br />Movement
            </h1>
            {/* Sub */}
            <p className="text-[15px] text-white/70 max-w-sm mb-8 leading-relaxed">
              Elevated essentials for every session. Performance wear that keeps up with you.
            </p>
            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collections/shop-women"
                className="inline-flex items-center justify-center bg-white text-black text-[12px] font-bold tracking-[0.14em] uppercase px-8 h-12 hover:bg-neutral-100 transition-colors"
              >
                Shop Women
              </Link>
              <Link
                href="/collections/shop-men"
                className="inline-flex items-center justify-center border border-white text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 h-12 hover:bg-white hover:text-black transition-colors"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scrim */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
}
