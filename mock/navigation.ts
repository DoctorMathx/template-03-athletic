import type { NavItem, BlogPost, TrainingCategory } from "@/lib/types";

export const navItems: NavItem[] = [
  {
    label: "Women",
    href: "/collections/shop-women",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Leggings", href: "/collections/leggings" },
      { label: "Sports Bras", href: "/collections/sports-bras" },
      { label: "Shorts", href: "/collections/shorts" },
      { label: "Tops", href: "/collections/tops" },
      { label: "Outerwear", href: "/collections/outerwear" },
      { label: "Joggers", href: "/collections/joggers" },
    ],
  },
  {
    label: "Men",
    href: "/collections/shop-men",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "T-Shirts & Tops", href: "/collections/tops" },
      { label: "Shorts", href: "/collections/shorts" },
      { label: "Joggers", href: "/collections/joggers" },
      { label: "Hoodies & Outerwear", href: "/collections/outerwear" },
    ],
  },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Explore", href: "/explore" },
  { label: "Sale", href: "/collections/sale" },
];

export const announcementMessages = [
  "FREE SHIPPING ON ORDERS OVER $75",
  "MID-SEASON SALE — UP TO 50% OFF",
  "NEW DROP: SHADOW SEAMLESS COLLECTION",
  "REFER A FRIEND · BOTH SAVE 10%",
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "best-leggings-guide",
    title: "Find Your Perfect Leggings: The Complete Guide",
    excerpt: "High-rise, mid-rise, seamless or textured — here's how to pick the pair built for your training.",
    image: "/images/pexels-photo-4908628.jpg",
    readTime: 5,
    category: "Style Guide",
  },
  {
    id: "b2",
    slug: "progressive-overload",
    title: "Progressive Overload: The Key To Consistent Results",
    excerpt: "The backbone of every strength programme. Learn how to apply it to your training this week.",
    image: "/images/pexels-photo-4804068.jpg",
    readTime: 7,
    category: "Training",
  },
  {
    id: "b3",
    slug: "sports-bra-guide",
    title: "Sports Bra Support Guide: Light, Medium & High",
    excerpt: "Yoga vs. running vs. lifting — the right support level changes everything.",
    image: "/images/pexels-photo-4909002.jpg",
    readTime: 4,
    category: "Style Guide",
  },
  {
    id: "b4",
    slug: "best-gym-shorts",
    title: "The Best Training Shorts for Every Workout",
    excerpt: "From 5\" lifters to 7\" runners — our breakdown of the best shorts for every session.",
    image: "/images/pexels-photo-4909033.jpg",
    readTime: 5,
    category: "Training",
  },
  {
    id: "b5",
    slug: "pull-up-guide",
    title: "How to Do Your First Pull-Up",
    excerpt: "Step-by-step progressions, grip tips, and the assistance moves to get your chin to the bar.",
    image: "/images/pexels-photo-4909320.jpg",
    readTime: 6,
    category: "Training",
  },
];

export const trainingCategories: TrainingCategory[] = [
  { id: "lifting",  label: "Lifting",  productIds: ["m1", "m2", "m6", "w1", "w2"] },
  { id: "running",  label: "Running",  productIds: ["m1", "m4", "w3", "w5"] },
  { id: "hiit",     label: "HIIT",     productIds: ["m1", "m3", "w2", "w5"] },
  { id: "pilates",  label: "Pilates",  productIds: ["w1", "w3", "w4", "w6"] },
  { id: "rest-day", label: "Rest Day", productIds: ["w7", "w8", "m7", "m8"] },
];

export const categoryTiles = [
  { label: "Leggings",    href: "/collections/leggings",    image: "/images/pexels-photo-4908636.jpg",                  gender: "women" },
  { label: "Sports Bras", href: "/collections/sports-bras", image: "/images/pexels-photo-4908991.jpg",                  gender: "women" },
  { label: "Shorts",      href: "/collections/shorts",      image: "/images/pexels-photo-4804068.jpg",                  gender: "men"   },
  { label: "Tops",        href: "/collections/tops",        image: "/images/pexels-photo-4909006.jpg",                  gender: "unisex"},
  { label: "Outerwear",   href: "/collections/outerwear",   image: "/images/pexels-photo-8436410.jpg",                  gender: "unisex"},
  { label: "Joggers",     href: "/collections/joggers",     image: "/images/pexels-photo-4909320.jpg",                  gender: "unisex"},
  { label: "Accessories", href: "/collections/accessories", image: "/images/pexels-photo-4909259.jpg",                  gender: "unisex"},
  { label: "Best Sellers",href: "/collections/new-arrivals",image: "/images/pexels-photo-4908551.jpg",                  gender: "unisex"},
];
