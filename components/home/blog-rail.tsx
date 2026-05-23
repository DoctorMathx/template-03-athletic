import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/mock/navigation";
import { ArrowRight } from "lucide-react";

export function BlogRail() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-[clamp(20px,2.2vw,28px)] font-black tracking-[-0.01em] uppercase text-black">
            Training Hub
          </h2>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] uppercase text-black hover:text-neutral-500 transition-colors"
          >
            All Articles <ArrowRight size={13} />
          </Link>
        </div>

        {/* Scroll rail */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group shrink-0 flex flex-col w-[260px] sm:w-[300px]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="300px"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1">
                  {post.category}
                </div>
              </div>
              {/* Text */}
              <p className="text-[11px] text-neutral-400 mb-1.5">{post.readTime} min read</p>
              <h3 className="text-[14px] font-bold text-black leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[13px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
