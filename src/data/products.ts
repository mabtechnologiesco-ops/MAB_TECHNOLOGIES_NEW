import { Banknote, type LucideIcon } from "lucide-react";

export type ProductStatus = "In Development" | "Coming Soon" | "Available" | "Beta";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problemSolved: string;
  features: string[];
  images: string[];
  logo?: string;
  icon?: LucideIcon;
  status: ProductStatus;
  detailsUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  ctaLabel?: string;
  featuresNote?: string;
}

export const products: Product[] = [
  {
    id: "eazy-check",
    slug: "eazy-check",
    name: "Eazy Check",
    tagline: "Count Smart. Count Easy.",
    description:
      "Eazy Check is a smart cash-counting application designed to make counting money faster, easier, and more organized.",
    problemSolved:
      "Manually counting cash can be time-consuming and lead to calculation errors. Eazy Check helps users organize cash by denomination, calculate totals, and simplify cash reconciliation.",
    features: [
      "Fast cash counting by denomination",
      "Accurate automatic total calculations",
      "Multiple cash bundles and counting sessions",
      "Cash reconciliation and discrepancy tracking",
      "Counting history and reports",
      "Support for multiple currencies (planned)",
      "Light and dark themes (planned)",
    ],
    featuresNote:
      "Some features are currently in development and may change before release.",
    images: [
      "/Eazy Check Green Login Flow.png",
      "/Neon Eazy Check App Dark Theme.png",
    ],
    logo: "/Glossy Green Calculator Finance Icon.png",
    icon: Banknote,
    status: "In Development",
    detailsUrl: "/products/eazy-check",
    ctaLabel: "Discover Eazy Check",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
