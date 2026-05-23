import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ToastProvider } from "@/lib/toast-context";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { ToastContainer } from "@/components/layout/toast-container";
import { NewsletterPopup } from "@/components/layout/newsletter-popup";

export const metadata: Metadata = {
  title: {
    default: "Finstore — Performance Activewear",
    template: "%s | Finstore",
  },
  description: "Premium activewear built for movement. Performance wear for every rep, run and rest day.",
  openGraph: {
    title: "Finstore — Performance Activewear",
    description: "Premium activewear built for movement.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <SiteHeader />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <ToastContainer />
              <NewsletterPopup />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
