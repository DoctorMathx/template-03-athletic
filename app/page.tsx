import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { SaleCountdown } from "@/components/home/sale-countdown";
import { FeaturedCampaign } from "@/components/home/featured-campaign";
import { CategoryGrid } from "@/components/home/category-grid";
import { NewArrivalsRail } from "@/components/home/new-arrivals-rail";
import { BestsellerList } from "@/components/home/bestseller-list";
import { PromoSplit } from "@/components/home/promo-split";
import { TrainingFilter } from "@/components/home/training-filter";
import { BlogRail } from "@/components/home/blog-rail";

export const metadata: Metadata = {
  title: "Finstore — Performance Activewear",
  description: "Premium activewear built for every rep, run and rest day. Shop new arrivals, bestsellers and sale.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SaleCountdown />
      <FeaturedCampaign />
      <CategoryGrid />
      <NewArrivalsRail />
      <BestsellerList />
      <PromoSplit />
      <TrainingFilter />
      <BlogRail />
    </>
  );
}
