import {
  Globe,
  AppWindow,
  Smartphone,
  Bot,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
  short: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "website-development",
    name: "Website Development",
    icon: Globe,
    short: "Websites that represent your business professionally.",
    description:
      "Business websites, corporate websites, landing pages, restaurant/hotel websites, portfolios, and e-commerce.",
    items: [
      "Business & corporate websites",
      "Landing pages",
      "Restaurant & hotel websites",
      "Portfolios",
      "E-commerce websites",
    ],
  },
  {
    id: "web-applications",
    name: "Web Applications",
    icon: AppWindow,
    short: "Software that runs your operations online.",
    description:
      "Booking systems, ordering platforms, customer portals, dashboards, inventory systems, and business software.",
    items: [
      "Booking systems",
      "Ordering platforms",
      "Customer portals",
      "Dashboards",
      "Inventory systems",
      "Business software",
    ],
  },
  {
    id: "mobile-applications",
    name: "Mobile Applications",
    icon: Smartphone,
    short: "Native-feel apps for your customers.",
    description:
      "Customer apps, booking apps, marketplaces, and custom apps for iOS and Android.",
    items: [
      "Customer apps",
      "Booking apps",
      "Marketplaces",
      "Custom mobile apps",
    ],
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    icon: Bot,
    short: "Intelligent assistants for your business.",
    description:
      "Website assistants, customer support, business knowledge, and lead qualification agents.",
    items: [
      "Website assistants",
      "Customer support agents",
      "Business knowledge agents",
      "Lead qualification agents",
    ],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    icon: Workflow,
    short: "Workflows that run themselves.",
    description:
      "Workflow automation, enquiry processing, notifications, and business integrations.",
    items: [
      "Workflow automation",
      "Enquiry processing",
      "Notifications",
      "Business integrations",
    ],
  },
];

export const serviceOptionsForForm: string[] = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "E-commerce",
  "AI Agent",
  "AI Automation",
  "Custom Digital Solution",
];
