import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/mock/navigation";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Training Hub",
  description: "Training tips, style guides, and expert content for every athlete.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-400 mb-2">Finstore</p>
        <h1 className="text-[clamp(32px,5vw,60px)] font-black tracking-[-0.02em] uppercase leading-tight">
          Training Hub
        </h1>
        <p className="text-[14px] text-neutral-500 mt-3 max-w-md">
          Training tips, style guides, and expert content — for every rep, run and rest day.
        </p>
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-neutral-100">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 lg:py-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white px-3 py-1.5">
                {featured.category}
              </span>
              <span className="text-[11px] text-neutral-400">{featured.readTime} min read</span>
            </div>
            <h2 className="text-[clamp(24px,3vw,40px)] font-black tracking-[-0.01em] leading-tight group-hover:text-neutral-600 transition-colors">
              {featured.title}
            </h2>
            <p className="text-[14px] text-neutral-600 leading-relaxed max-w-md">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] uppercase mt-2 group-hover:gap-3 transition-all">
              Read Article <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-neutral-100" />
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-400">More Articles</p>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-2">
              {post.category} · {post.readTime} min
            </span>
            <h3 className="text-[15px] font-bold leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-[12px] text-neutral-500 mt-2 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase mt-3 group-hover:gap-2.5 transition-all">
              Read <ArrowRight size={11} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
