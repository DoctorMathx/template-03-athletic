import Link from "next/link";
import Image from "next/image";
import { categoryTiles } from "@/mock/navigation";

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-[#f5f5f0]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-[clamp(20px,2.2vw,28px)] font-black tracking-[-0.01em] uppercase text-black">
            Shop by Category
          </h2>
        </div>

        {/* Grid — 4 cols desktop, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categoryTiles.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-200 block"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-[13px] font-bold tracking-[0.1em] uppercase text-white">{cat.label}</p>
                <p className="text-[11px] text-white/60 mt-0.5 capitalize">{cat.gender === "unisex" ? "Men & Women" : cat.gender}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
