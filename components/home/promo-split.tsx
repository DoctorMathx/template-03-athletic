import Link from "next/link";
import Image from "next/image";

export function PromoSplit() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Tile 1 — Women */}
          <Link href="/collections/shop-women" className="group relative aspect-[4/5] overflow-hidden bg-neutral-200 block">
            <Image
              src="/images/pexels-pnw-prod-8980925.jpg"
              alt="Shop Women"
              fill
              className="object-cover object-top transition-transform duration-600 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 mb-2">New Collection</p>
              <h3 className="text-[clamp(24px,2.5vw,36px)] font-black tracking-[-0.01em] uppercase text-white leading-tight mb-4">
                Women&apos;s<br />Essentials
              </h3>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-white border-b border-white pb-0.5">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Tile 2 — Men */}
          <Link href="/collections/shop-men" className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 block">
            <Image
              src="/images/pexels-ron-lach-10483704.jpg"
              alt="Shop Men"
              fill
              className="object-cover object-top transition-transform duration-600 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 mb-2">Performance Edition</p>
              <h3 className="text-[clamp(24px,2.5vw,36px)] font-black tracking-[-0.01em] uppercase text-white leading-tight mb-4">
                Men&apos;s<br />Training
              </h3>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-white border-b border-white pb-0.5">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
