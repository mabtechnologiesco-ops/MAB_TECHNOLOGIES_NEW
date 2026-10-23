export interface MaintenanceTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
}

export interface MaintenanceCategory {
  id: "websites" | "applications" | "ai";
  label: string;
  tiers: MaintenanceTier[];
}

export const maintenanceCategories: MaintenanceCategory[] = [
  {
    id: "websites",
    label: "Website Maintenance",
    tiers: [
      {
        name: "Basic Business Website",
        price: "Le 500",
        period: "/month",
        features: [
          "Basic bug fixes",
          "Monthly website functionality checks",
          "Basic technical support",
          "Minor text and image updates",
          "Basic security checks",
        ],
      },
      {
        name: "Professional Business Website",
        price: "Le 750",
        period: "/month",
        features: [
          "Bug fixes and troubleshooting",
          "Monthly website functionality checks",
          "Security and dependency checks",
          "Minor content updates",
          "Technical support",
          "Basic website performance checks",
        ],
        featured: true,
      },
      {
        name: "E-commerce Website",
        price: "Le 1,500 – 3,000",
        period: "/month",
        features: [
          "Bug fixes and troubleshooting",
          "Product and payment functionality checks",
          "Security and dependency checks",
          "Minor website updates",
          "Technical support",
          "Basic performance monitoring",
        ],
      },
    ],
  },
  {
    id: "applications",
    label: "Application Maintenance",
    tiers: [
      {
        name: "Custom Web Application",
        price: "Le 3,000 – 5,000",
        period: "/month",
        features: [
          "Application troubleshooting and bug fixes",
          "Database and backend health checks",
          "Security and dependency checks",
          "Performance monitoring",
          "Technical support",
          "Minor updates to existing functionality",
        ],
        featured: true,
      },
    ],
  },
  {
    id: "ai",
    label: "AI Solutions Maintenance",
    tiers: [
      {
        name: "AI Agent & Automation",
        price: "Le 750 – 1,500",
        period: "/month",
        features: [
          "AI agent health and uptime monitoring",
          "Knowledge base and content updates",
          "Prompt tuning and response optimization",
          "Integration and API health checks",
          "Technical support",
          "Usage analytics review",
        ],
        featured: true,
      },
    ],
  },
];

export const maintenanceTerms: string[] = [
  "Hosting and domain registration are charged separately.",
  "Paid third-party services and API fees are charged separately.",
  "New features, major redesigns, and substantial changes are quoted separately.",
  "Maintenance covers only the services agreed upon in the maintenance contract.",
  "Monthly maintenance payments are due at the beginning of each billing period.",
];