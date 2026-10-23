export interface WebsitePackage {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface TierPackage {
  name: string;
  price: string;
  description: string;
  note?: string;
  features?: string[];
  popular?: boolean;
}

export interface PricingCategory {
  id: "websites" | "applications" | "ai";
  label: string;
  websitePackages?: WebsitePackage[];
  tierPackages?: TierPackage[];
  disclosure?: string;
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "websites",
    label: "Websites",
    websitePackages: [
      {
        name: "Starter",
        price: "SLE 3,000",
        features: [
          "1–3 pages",
          "Responsive design",
          "Basic SEO",
          "Social links",
          "Google Business Profile assistance",
          "3 months hosting under agreed terms",
          "1 month maintenance",
        ],
      },
      {
        name: "Business",
        price: "SLE 5,000",
        features: [
          "4–7 pages",
          "Custom design",
          "Contact form",
          "Basic SEO",
          "WhatsApp/social integration",
          "Deployment assistance",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "SLE 10,000",
        features: [
          "Premium design",
          "Expanded pages",
          "Advanced interactions",
          "Enhanced SEO",
          "Lead-generation features",
          "Optimization",
        ],
      },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    tierPackages: [
      {
        name: "Web Application",
        price: "from SLE 15,000",
        description:
          "Booking systems, portals, dashboards, and business software built for the web.",
        features: [
          "Booking systems & portals",
          "Custom business dashboards",
          "Business workflow software",
          "Responsive web delivery",
          "Deployment assistance",
        ],
      },
      {
        name: "Mobile Application",
        price: "from SLE 25,000",
        popular: true,
        description:
          "Customer apps, booking apps, and marketplaces for iOS and Android.",
        features: [
          "Native iOS & Android",
          "Customer apps & marketplaces",
          "Booking & ordering apps",
          "App store publishing support",
          "Push notifications",
        ],
      },
      {
        name: "Custom Digital Platform",
        price: "from SLE 30,000",
        description:
          "Tailored platforms combining web, mobile, and integrations for complex needs.",
        features: [
          "Tailored web + mobile platforms",
          "Third-party integrations",
          "Complex workflow support",
          "Scalable architecture",
          "Dedicated project management",
        ],
      },
    ],
    disclosure:
      "Final prices depend on functionality, integrations, security, complexity, and deployment requirements.",
  },
  {
    id: "ai",
    label: "AI Solutions",
    tierPackages: [
      {
        name: "AI Website Assistant",
        price: "from SLE 5,000",
        description:
          "An AI assistant embedded on your website to answer visitor questions and capture leads.",
        features: [
          "Embedded on your website",
          "24/7 visitor Q&A",
          "Lead capture & qualification",
          "Trained on your content",
          "Usage analytics",
        ],
      },
      {
        name: "AI Business Automation",
        price: "from SLE 7,500",
        popular: true,
        description:
          "Automate workflows, enquiry processing, notifications, and business integrations.",
        features: [
          "Workflow automation",
          "Automated enquiry processing",
          "Notification routing",
          "Business tool integrations",
          "Time & cost savings",
        ],
      },
      {
        name: "AI Customer Support Agent",
        price: "from SLE 10,000",
        description:
          "Handle customer support conversations with your business knowledge base.",
        features: [
          "24/7 chat support",
          "Knowledge-base grounded",
          "Multi-turn conversations",
          "Ticket hand-off support",
          "Omnichannel messaging",
        ],
      },
      {
        name: "Custom AI Agent System",
        price: "from SLE 15,000",
        description:
          "Bespoke multi-agent systems tailored to your operations and data.",
        features: [
          "Bespoke multi-agent design",
          "Tailored to your data & ops",
          "Agent orchestration",
          "Advanced integrations",
          "Ongoing tuning",
        ],
      },
    ],
    disclosure:
      "Implementation fees do not automatically include unlimited AI usage, hosting, subscriptions, or maintenance. Domain, hosting, and renewal terms are disclosed per project. No free domain is promised unless explicitly included in the offer.",
  },
];

export const pricingNotes: string[] = [
  "These are configurable starting prices, not guaranteed quotes for every project.",
  "Domain and hosting renewal terms are disclosed per project.",
];
