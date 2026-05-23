import Link from "next/link";
import Image from "next/image";

export function FeaturedCampaign() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 lg:order-2">
            <Image
              src="/images/pexels-photobydela-2155632563-33832201.jpg"
              alt="Velocity Seamless Collection"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="lg:order-1 flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-400 mb-4">
              Featured Collection
            </p>
            <h2 className="text-[clamp(32px,4vw,54px)] font-black tracking-[-0.02em] uppercase text-black leading-[0.95] mb-6">
              Velocity<br />Seamless
            </h2>
            <p className="text-[15px] text-neutral-600 leading-relaxed max-w-md mb-8">
              Sculpting, buttery-soft and built for your best session. Four-way stretch seamless
              technology with a high-rise waist that stays put through every movement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collections/leggings"
                className="inline-flex items-center justify-center bg-black text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 h-12 hover:bg-neutral-800 transition-colors"
              >
                Shop Leggings
              </Link>
              <Link
                href="/collections/sports-bras"
                className="inline-flex items-center justify-center border border-black text-black text-[12px] font-bold tracking-[0.14em] uppercase px-8 h-12 hover:bg-black hover:text-white transition-colors"
              >
                Shop Sets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
