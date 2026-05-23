import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Finstore — premium activewear built for every rep, run and rest day.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[400px] sm:h-[500px] bg-neutral-900 overflow-hidden">
        <Image
          src="/images/pexels-rocketmann-prod-9486932.jpg"
          alt="About Finstore"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-white/60 mb-4">Our Story</p>
            <h1 className="text-[clamp(40px,6vw,80px)] font-black tracking-[-0.02em] uppercase text-white leading-tight">
              Built For<br />Movement
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Mission */}
        <div className="max-w-[680px] mx-auto text-center mb-20">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-400 mb-4">Our Mission</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-0.02em] uppercase leading-tight mb-6">
            Premium Activewear,<br />For Everyone
          </h2>
          <p className="text-[15px] text-neutral-600 leading-relaxed">
            Finstore was built on a simple belief: that premium performance activewear should be accessible to every athlete,
            at every level. From your first gym session to your hundredth race — we build gear that keeps up with you.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Performance First",
              desc: "Every fabric, every stitch, every silhouette is engineered with one goal: helping you perform at your best.",
            },
            {
              title: "Built to Last",
              desc: "We use premium materials that hold their shape, resist pilling, and survive hundreds of wash cycles. Buy less. Train more.",
            },
            {
              title: "Inclusive Sizing",
              desc: "From XS to XXL, every style is designed and tested on real bodies at every size. Great fit isn't a luxury.",
            },
          ].map((v) => (
            <div key={v.title} className="border-t-2 border-black pt-6">
              <h3 className="text-[15px] font-black uppercase tracking-[-0.01em] mb-3">{v.title}</h3>
              <p className="text-[13px] text-neutral-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Split image-text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            <Image src="/images/pexels-gabby-k-6238122.jpg" alt="The Finstore Community" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">Lagos — 2022</p>
            <h2 className="text-[clamp(24px,3vw,40px)] font-black tracking-[-0.02em] uppercase leading-tight mb-6">
              Designed in Lagos.<br />Worn Worldwide.
            </h2>
            <p className="text-[14px] text-neutral-600 leading-relaxed mb-5">
              Founded in Lagos, Nigeria, Finstore began as a small team of athletes who couldn&apos;t find activewear
              that suited both their training needs and their climate. We set out to change that.
            </p>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Today we ship to over 40 countries, and every piece is still designed with the same philosophy it started with:
              make activewear that actually works.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/collections/new-arrivals"
            className="inline-flex items-center justify-center bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-10 py-4 hover:bg-neutral-800 transition-colors"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
