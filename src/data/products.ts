import { Banknote, type LucideIcon } from "lucide-react";

export type ProductStatus = "In Development" | "Coming Soon" | "Available" | "Beta";

export interface ProductDetailSection {
  title: string;
  body: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription?: string;
  problemSolved: string;
  features: string[];
  featuresNote?: string;
  detailSections?: ProductDetailSection[];
  audience?: string[];
  benefits?: ProductBenefit[];
  closing?: string;
  closingCta?: string;
  images: string[];
  logo?: string;
  icon?: LucideIcon;
  status: ProductStatus;
  detailsUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  ctaLabel?: string;
}

export const products: Product[] = [
  {
    id: "eazy-check",
    slug: "eazy-check",
    name: "Eazy Check",
    tagline: "Count Smart. Count Easy.",
    description:
      "Eazy Check is a smart cash-counting application that helps you count banknotes, manage cash calculations, save counting history, and access your records online or offline. With automatic synchronization, secure account access, and convenient printing and data transfer features, managing cash has never been easier.",
    shortDescription:
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
    detailSections: [
      {
        title: "Smart Automatic Cash Counting",
        body: "Count your money faster and more efficiently with Eazy Check's automatic banknote-scanning feature. Scan each note to help count your cash and calculate the total amount automatically, reducing the need for manual calculations and helping minimize counting errors.",
      },
      {
        title: "Works Online and Offline",
        body: "Count your money wherever you are, even without an internet connection. Eazy Check allows you to continue using its supported counting features offline, so unreliable internet access does not have to interrupt your work. Your locally saved counting records remain available offline, with automatic synchronization when your internet connection returns.",
      },
      {
        title: "Automatic Saving and Synchronization",
        body: "Your counting records are saved so you can access your history later. When connected to the internet, Eazy Check automatically synchronizes supported records with your account, helping keep your data up to date. You can continue working offline and sync your changes when you reconnect.",
      },
      {
        title: "Complete Counting History",
        body: "Keep your cash-counting records organized in one place. Eazy Check saves your counting history by date and allows you to review previous calculations and their recorded details. Easily revisit past counts when you need to check an amount, review a transaction, or compare previous calculations.",
      },
      {
        title: "Flexible Note Management",
        body: "You are in control of your cash calculations. Add or reduce the number of banknotes for any supported denomination whenever you need to correct a count or adjust an amount. This makes it easier to handle different cash quantities, correct mistakes, and keep your calculations accurate.",
      },
      {
        title: "Account-Based Data Access",
        body: "Your phone should not be the only place you can access your records. If you lose your phone or change to a new device, you can sign in to your Eazy Check account to access records that have been successfully synchronized to your account. Simply remember your account login details and access your synchronized data from a supported device. Any records that were saved only on your lost device and had not yet synchronized may not be recoverable.",
      },
      {
        title: "Export and Import Your Data",
        body: "Take control of your records with convenient data export and import features. Export supported counting records for backup, recordkeeping, or transfer. Import supported files when you need to restore or transfer your data. This gives you more flexibility in managing your counting history and maintaining your own records.",
      },
      {
        title: "Print Your Calculations for Proof and Recordkeeping",
        body: "Need a physical record of your cash count? Eazy Check allows you to print your calculations so you can keep a hard copy for documentation, verification, reporting, or proof of the amount counted. This is particularly useful for businesses, cashiers, shop owners, and anyone who needs a clear record of a cash-counting session.",
      },
    ],
    audience: [
      "Shop owners and retail businesses",
      "Cashiers and cash-handling staff",
      "Small and medium-sized businesses",
      "Money counters and financial recordkeepers",
      "Individuals who regularly count and manage cash",
    ],
    benefits: [
      { title: "Count Faster", description: "Scan banknotes and automate calculations." },
      { title: "Work Anywhere", description: "Continue supported counting activities without internet access." },
      { title: "Keep Your Records", description: "Review previous calculations by date." },
      { title: "Stay Synchronized", description: "Automatically sync supported records when internet access returns." },
      { title: "Adjust with Ease", description: "Add or reduce banknote quantities as needed." },
      { title: "Access Your Account", description: "Retrieve synchronized records after changing or losing a device." },
      { title: "Export and Import", description: "Transfer and manage supported data files." },
      { title: "Print with Confidence", description: "Keep printed calculations for documentation and verification." },
    ],
    closing:
      "Your Cash. Your Records. Your Control. Eazy Check brings smarter cash counting, organized records, and flexible data access together in one convenient application. Whether you are counting money for your business or managing cash every day, Eazy Check helps make the process simpler and more efficient.",
    closingCta: "Discover Eazy Check",
    images: [
      "/Neon Eazy Check App Dark Theme - Copy.png",
      "/Eazy Check Green Login Flow - Copy.png",
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
