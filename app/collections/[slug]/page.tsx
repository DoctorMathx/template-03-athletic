import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollectionBySlug, collections } from "@/mock/collections";
import { getProductsByIds } from "@/mock/products";
import { CollectionClient } from "./collection-client";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) return { title: "Collection Not Found" };
  return {
    title: col.title,
    description: col.description,
  };
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) notFound();

  const products = getProductsByIds(col.productIds);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] bg-neutral-900 overflow-hidden">
        <Image
          src={col.heroImage}
          alt={col.title}
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <h1 className="text-[clamp(32px,5vw,64px)] font-black tracking-[-0.02em] uppercase text-white leading-tight">
              {col.title}
            </h1>
            <p className="text-[14px] text-white/60 mt-2 max-w-md">{col.description}</p>
          </div>
        </div>
      </div>

      <CollectionClient products={products} />
    </>
  );
}
