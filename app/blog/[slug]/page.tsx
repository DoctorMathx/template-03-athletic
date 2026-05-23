import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/mock/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

const articleContent: Record<string, string[]> = {
  "best-leggings-guide": [
    "Finding the perfect pair of leggings is a deeply personal journey. Whether you're hitting a HIIT class, going for a long run or flowing through a yoga session, the right leggings can make all the difference.",
    "The most important factors to consider are rise (high-rise vs mid-rise), fabric (seamless vs woven), compression level, and waistband style. High-rise leggings are the most popular choice right now — they offer core support, stay in place during dynamic movement, and are flattering on most body types.",
    "For weightlifting and strength training, look for a thick, compressive fabric with minimal seaming at the thigh. Our Velocity Seamless Leggings are a favourite here — four-way stretch with zero chafing.",
    "For running, prioritise moisture-wicking fabrics, reflective details if you run outdoors, and a waistband with a phone pocket. Flare leggings like our Stride Flare are having a moment for studio cardio.",
    "For yoga and pilates, a softer, more flexible fabric wins. You want freedom of movement without restriction, and ideally an opaque fabric that stays opaque even in deep stretches.",
    "Whatever your training style, investing in quality leggings pays off. Cheaper leggings often lose their shape, pill, or go see-through after a few washes. A solid pair from a trusted brand will last years.",
  ],
  "progressive-overload": [
    "Progressive overload is the single most important principle in strength training. In simple terms: you need to progressively increase the demand placed on your body over time to continue making gains.",
    "Without progressive overload, your body adapts to the stress of training and progress stalls. This is why many people plateau after a few months of training — they keep doing the same weights, same reps, same routine.",
    "There are several ways to apply progressive overload: increase the weight lifted, increase the number of reps or sets, decrease rest times, improve form and range of motion, or increase training frequency.",
    "The most straightforward method is the double progression model: aim to hit the top end of your rep range (say, 3x12) before increasing the weight. Once you can do 3x12 comfortably, add 2.5kg and drop back to 3x8–10.",
    "Track your sessions. A simple notebook or app is enough. Without tracking, you have no baseline to progress from. Even just logging sets, reps and weights will give you an enormous edge.",
    "Recovery is part of the equation too. Progressive overload only works if you're recovering between sessions. Prioritise sleep, protein intake, and rest days. Training in the right activewear — supportive, breathable, built for your sport — can help you perform better every session.",
  ],
};

const defaultContent = [
  "Building the right training routine starts with understanding your goals. Whether you're looking to build strength, improve endurance, or simply move more, having a clear plan is the foundation of consistent progress.",
  "Equipment matters, but it's not everything. The most important thing is showing up — consistently, with intention. Your kit can support that: the right sports bra for your support level, leggings that move with you, a top that breathes.",
  "Start simple. Pick 3–4 sessions per week. Focus on compound movements that train multiple muscle groups at once. Progress gradually. Rest when you need to.",
  "And don't underestimate the mental side of training. The days you don't feel like going are often the most important ones to go. Build the habit first, then optimise from there.",
];

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug] ?? defaultContent;
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] uppercase text-neutral-400 hover:text-black transition-colors mb-10"
      >
        <ArrowLeft size={13} /> Training Hub
      </Link>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-16 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white px-3 py-1.5">
              {post.category}
            </span>
            <span className="text-[11px] text-neutral-400">{post.readTime} min read</span>
          </div>
          <h1 className="text-[clamp(28px,4vw,52px)] font-black tracking-[-0.02em] leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-[16px] text-neutral-600 leading-relaxed max-w-xl">
            {post.excerpt}
          </p>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-neutral-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 440px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[680px] space-y-5 mb-16">
        {content.map((para, i) => (
          <p key={i} className="text-[15px] text-neutral-700 leading-[1.8]">
            {para}
          </p>
        ))}
      </div>

      {/* Related */}
      <div className="border-t border-neutral-100 pt-12">
        <h2 className="text-[16px] font-black tracking-[-0.01em] uppercase mb-8">More From The Hub</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((rp) => (
            <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={rp.image}
                  alt={rp.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-2">
                {rp.category}
              </span>
              <h3 className="text-[14px] font-bold leading-snug group-hover:text-neutral-600 transition-colors">
                {rp.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
