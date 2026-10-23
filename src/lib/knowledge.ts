/**
 * MAB Technologies SL — AI assistant knowledge base.
 *
 * Single source of truth for offline (no-AI-key) answers. Imported by both the
 * frontend widget (`@/lib/knowledge`) and the Supabase edge function
 * (`supabase/functions/ai-chat/index.ts`).
 *
 * RULE: only state facts that exist in the site's own data files
 * (src/data/company.ts, services.ts, pricing.ts, portfolio.ts).
 * Never invent prices, features, client names, testimonials or demo links.
 */

export interface KnowledgeEntry {
  id: string;
  intent: string;
  /** Canonical / suggested question this entry answers. */
  question: string;
  /** Lower-case phrases used for intent matching. Longer phrases score higher. */
  keywords: string[];
  /** Full answer shown to the visitor. */
  answer: string;
  /** Optional follow-up chips the visitor can tap next. */
  followUps?: string[];
}

import { company } from "@/data/company";
import { services } from "@/data/services";
import { pricingCategories, pricingNotes } from "@/data/pricing";
import { projects } from "@/data/portfolio";

/* -------------------------------------------------------------------------- */
/*                       Data derived from the site sources                   */
/* -------------------------------------------------------------------------- */

export const companyInfo = {
  name: company.name,
  shortName: company.shortName,
  tagline: company.tagline,
  brandStatement: company.brandStatement,
  location: company.location,
  emails: company.emails,
  phones: company.phones,
  whatsapp: company.whatsapp.url,
  whatsappDisplay: company.whatsapp.display,
  about: company.about.body,
  process: company.process.map((p) => ({ name: p.name, description: p.description })),
};

export const servicesInfo = services.map((s) => ({
  name: s.name,
  description: s.description,
  items: s.items,
}));

const websitesPricing = pricingCategories.find((c) => c.id === "websites");
const applicationsPricing = pricingCategories.find((c) => c.id === "applications");
const aiPricing = pricingCategories.find((c) => c.id === "ai");

export const pricingInfo = {
  websites: websitesPricing?.websitePackages ?? [],
  applications: applicationsPricing?.tierPackages ?? [],
  ai: aiPricing?.tierPackages ?? [],
  notes: pricingNotes,
};

export const portfolioInfo = projects.map((p) => ({
  name: p.name,
  category: p.category,
  type: p.type,
  description: p.description,
  demoUrl: p.demoUrl,
}));


/* -------------------------------------------------------------------------- */
/*                     Answer builders (single source of truth)              */
/* -------------------------------------------------------------------------- */

function websitePricingAnswer(): string {
  const lines = pricingInfo.websites.map(
    (p) => `• ${p.name} — ${p.price} (${p.features.join(", ")})`,
  );
  return `Website pricing at ${companyInfo.name} (in SLE):\n\n${lines.join(
    "\n",
  )}\n\nThese are starting prices, not guaranteed quotes. Share your requirements via the contact form or WhatsApp for a tailored quote.`;
}

function tierPricingAnswer(
  title: string,
  tiers: { name: string; price: string; description: string }[],
  closing: string,
): string {
  const lines = tiers.map((t) => `• ${t.name} — ${t.price} (${t.description})`);
  return `${title} pricing at ${companyInfo.name}:\n\n${lines.join("\n")}\n\n${closing}`;
}

function contactAnswer(): string {
  const phones = companyInfo.phones
    .map((p) => p.replace(/^(\+?\d{3})(\d{3})(\d{4})$/, "$1 $2 $3"))
    .join(" or ");
  return `You can reach ${companyInfo.name} at:\n\n• Email: ${companyInfo.emails.join(", ")}\n• Phone: ${phones}\n• WhatsApp: ${companyInfo.whatsapp}\n\nWe're based in ${companyInfo.location}. You can also use the contact form on the Contact section, or tap "Start a project" in this chat and we'll pick up your details.`;
}

function processAnswer(): string {
  const steps = companyInfo.process
    .map((p, i) => `${i + 1}. ${p.name} — ${p.description}`)
    .join("\n");
  return `Our ${companyInfo.process.length}-step process:\n\n${steps}\n\nTimelines depend on scope — a website is quicker than a custom platform. Tell us what you need and we'll give you a realistic schedule.`;
}



/** Canonical knowledge base entries — one per answerable intent. */
export const knowledgeEntries: KnowledgeEntry[] = [
  {
    id: "website-pricing",
    intent: "pricing-website",
    question: "How much does a website cost?",
    keywords: [
      "website price", "website cost", "website pricing", "how much website",
      "cost of website", "price of a website", "website how much", "site cost",
      "web design price", "website charges", "how much for a website",
      "how much for websites", "cost for a website", "price for a website",
      "how much will a website cost",
    ],
    answer: websitePricingAnswer(),
    followUps: ["Can you build an e-commerce website?", "How long does a website take?"],
  },
  {
    id: "app-pricing",
    intent: "pricing-application",
    question: "How much does a web or mobile application cost?",
    keywords: [
      "app price", "app cost", "application price", "application cost",
      "web app price", "web app cost", "mobile app price", "mobile app cost",
      "how much app", "cost of an app", "portal cost", "dashboard cost",
      "booking system cost", "custom platform price",
      "how much for an app", "how much for a web app", "price for an app",
    ],
    answer:
      tierPricingAnswer(
        "Application",
        pricingInfo.applications,
        "Final prices depend on functionality, integrations, security, complexity and deployment requirements. Contact us to scope your project.",
      ),
    followUps: ["Can you build a mobile app?", "What AI agents do you offer?"],
  },
  {
    id: "ai-pricing",
    intent: "pricing-ai",
    question: "How much do AI solutions cost?",
    keywords: [
      "ai price", "ai cost", "ai pricing", "ai solution price", "ai solutions cost",
      "how much ai", "cost of ai", "agent price", "automation price",
      "ai website assistant price", "chatbot price",
      "how much for ai", "price for ai", "cost for ai",
      "how much for ai solutions", "ai how much",
    ],
    answer:
      tierPricingAnswer(
        "AI Solutions",
        pricingInfo.ai,
        "Implementation fees do not automatically include unlimited AI usage, hosting, subscriptions, or maintenance. Domain and hosting renewal terms are disclosed per project. Share your use case for a tailored quote.",
      ),
    followUps: ["What AI agents do you offer?", "How can I automate my business?"],
  },
  {
    id: "pricing-overview",
    intent: "pricing-general",
    question: "What are your prices?",
    keywords: [
      "price", "pricing", "cost", "how much", "charges", "rates", "budget",
      "quote", "starting price", "packages", "your prices", "all prices",
      "price list", "general pricing",
    ],
    answer:
      "Our pricing categories (starting prices in Sierra Leonean leones):\n\n• Websites — SLE 3,000 to SLE 10,000\n• Applications — from SLE 15,000 to SLE 30,000\n• AI Solutions — from SLE 5,000 to SLE 15,000\n\nThese are configurable starting prices, not guaranteed quotes. Tell me which category you need and I'll share the details, or use the contact form for a tailored quote.",
    followUps: ["How much does a website cost?", "How much does a web or mobile application cost?"],
  },
];

const servicesList = servicesInfo
  .map((s) => `• ${s.name} — ${s.description}\n  Includes: ${s.items.join(", ")}.`)
  .join("\n");

knowledgeEntries.push(
  {
    id: "services-overview",
    intent: "services-list",
    question: "What services do you offer?",
    keywords: [
      "services", "service", "what do you do", "offerings", "capabilities",
      "what can you build", "what do you offer", "help with", "areas of expertise",
      "specialise", "specialize", "expertise", "what do you build",
    ],
    answer:
      `MAB Technologies offers five core services:\n\n${servicesList}\n\nWhich area interests you? I can share pricing for it or help you start a project.`,
    followUps: ["Can you build an e-commerce website?", "What AI agents do you offer?"],
  },
  {
    id: "ecommerce",
    intent: "service-ecommerce",
    question: "Can you build an e-commerce website?",
    keywords: [
      "ecommerce", "e-commerce", "e commerce", "online store", "shop",
      "shopping website", "selling online", "online shop", "product selling",
      "store website", "checkout", "cart",
    ],
    answer:
      "Yes — we build e-commerce websites under our Website Development service, with product showcase, ordering and checkout capabilities.\n\nOur portfolio includes live e-commerce work: Harte Perfume (fragrance brand e-commerce), the Chocolate & Cake Ordering Platform, and the Building Materials Ordering Platform.\n\nE-commerce typically fits the Business (from SLE 5,000) or Premium (from SLE 10,000) website tier depending on scope. Tell us about your products via the contact form for a specific quote.",
    followUps: ["How much does a website cost?", "Can I see your portfolio?"],
  },
  {
    id: "mobile-apps",
    intent: "service-mobile",
    question: "Can you build a mobile app?",
    keywords: [
      "mobile app", "mobile apps", "phone app", "android", "android app",
      "ios", "app development", "custom app", "customer app", "marketplace app",
      "mobile application", "native app", "make an app", "build an app",
    ],
    answer:
      "Yes — MAB Technologies builds mobile applications for iOS and Android: customer apps, booking apps, marketplaces, and custom mobile apps.\n\nMobile applications start from SLE 25,000. Final pricing depends on features, platforms, and integrations. Use the contact form or WhatsApp to scope your app.",
    followUps: ["How much does a web or mobile application cost?", "What AI agents do you offer?"],
  },
  {
    id: "web-apps",
    intent: "service-webapp",
    question: "Can you build a web application?",
    keywords: [
      "web app", "web application", "web applications", "web app development",
      "booking system", "ordering platform", "customer portal", "dashboard",
      "inventory system", "business software", "admin panel", "crm",
      "management system", "online system",
    ],
    answer:
      "Yes — we build web applications that run your operations online: booking systems, ordering platforms, customer portals, dashboards, inventory systems, and business software.\n\nWeb applications start from SLE 15,000; custom digital platforms combining web, mobile and integrations start from SLE 30,000.\n\nRelevant portfolio work: Chocolate & Cake Ordering Platform, Building Materials Ordering Platform, and the Restaurant Ordering Platform.",
    followUps: ["How much does a web or mobile application cost?", "Can you build a mobile app?"],
  },
  {
    id: "ai-agents",
    intent: "service-ai-agents",
    question: "What AI agents do you offer?",
    keywords: [
      "ai agent", "ai agents", "agent system", "ai assistant", "ai assistants",
      "chatbot", "chat bot", "chatbots", "chat bots", "do you offer chatbots",
      "ai chatbot", "virtual assistant", "support agent",
      "website assistant", "lead qualification", "knowledge agent",
      "customer support ai", "conversational ai",
    ],
    answer:
      "Our AI agents:\n\n• AI Website Assistant — from SLE 5,000 (embedded on your website to answer visitor questions and capture leads)\n• AI Customer Support Agent — from SLE 10,000 (handles support conversations with your business knowledge base)\n• Custom AI Agent System — from SLE 15,000 (bespoke multi-agent systems tailored to your operations and data)\n\nAgent types we build include website assistants, customer support agents, business knowledge agents, and lead qualification agents.\n\nImplementation fees do not include unlimited AI usage, hosting, subscriptions, or maintenance. Contact us to scope your use case.",
    followUps: ["How much do AI solutions cost?", "How can I automate my business?"],
  },
  {
    id: "ai-automation",
    intent: "service-ai-automation",
    question: "How can I automate my business?",
    keywords: [
      "automat", "automation", "automate", "automate my business", "workflow",
      "workflow automation", "enquiry processing", "notifications",
      "business integration", "integrations", "manual process", "streamline",
      "save time", "efficient",
    ],
    answer:
      "We build AI business automation that runs repetitive work for you — workflow automation, enquiry processing, notifications, and business integrations.\n\nAI Business Automation starts from SLE 7,500. We automate the workflows behind enquiries, notifications and the systems your business already uses.\n\nPricing depends on the systems involved and complexity. Tell us which manual process is costing you the most time and we'll propose the approach.",
    followUps: ["What AI agents do you offer?", "How much do AI solutions cost?"],
  },
);




const portfolioList = portfolioInfo
  .map((p) => {
    const demo = p.demoUrl ? " — live demo available" : " — concept";
    return `• ${p.name} (${p.category}, ${p.type})${demo}`;
  })
  .join("\n");

knowledgeEntries.push(
  {
    id: "portfolio",
    intent: "portfolio",
    question: "Can I see your portfolio?",
    keywords: [
      "portfolio", "work", "projects", "project", "past work", "previous work",
      "examples", "showcase", "clients", "case study", "case studies",
      "sites you've built", "things you've built", "your work", "demo",
    ],
    answer:
      `Our portfolio includes:\n\n${portfolioList}\n\nVisit the Our Work section to explore each project — live demos are available for most of them. Use "Build Something Similar" on any project to start an enquiry.`,
    followUps: ["Can you build an e-commerce website?", "How can I contact you?"],
  },
  {
    id: "contact",
    intent: "contact",
    question: "How can I contact you?",
    keywords: [
      "contact", "reach", "email", "phone", "whatsapp", "talk", "speak",
      "get in touch", "call", "message", "enquire", "enquiry", "call you",
      "where are you", "location", "address", "chat",
    ],
    answer: contactAnswer(),
    followUps: ["How do I start a project?", "What services do you offer?"],
  },
  {
    id: "process",
    intent: "process",
    question: "How do you work with clients?",
    keywords: [
      "process", "how do you work", "working process", "methodology", "steps",
      "stages", "workflow", "how does it work", "what happens", "approach",
      "after launch", "support", "discover design build",
    ],
    answer: processAnswer(),
    followUps: ["How do I start a project?", "What services do you offer?"],
  },
  {
    id: "company",
    intent: "company-about",
    question: "Who is MAB Technologies?",
    keywords: [
      "about you", "who are you", "company", "mab technologies", "your business",
      "about mab", "tell me about you", "what is mab", "your story", "your mission",
      "your vision", "brand statement", "digital future", "sierra leone",
      "where are you based", "your tagline",
    ],
    answer:
      "MAB Technologies SL is a Sierra Leone technology company helping businesses grow through modern websites, powerful applications, and intelligent AI solutions.\n\nWe work with organizations across industries to build digital products that help them work smarter, serve customers better, and stand out in a competitive market.\n\nOur tagline: \"YOU IMAGINE IT. WE BUILD IT.\" — Smart Solutions for a Stronger Digital Future. From a first business website to custom AI automation, we partner with you from idea to launch and beyond.",
    followUps: ["What services do you offer?", "How do I start a project?"],
  },
  {
    id: "start-project",
    intent: "enquiry",
    question: "How do I start a project?",
    keywords: [
      "start a project", "start project", "get started", "begin", "hire you",
      "work with you", "work with mab", "engage you", "book you", "enlist you",
      "commission", "new project", "ready to start", "how do we start",
      "can i hire", "sign up",
    ],
    answer:
      "Starting a project is easy:\n\n1. Tap \"Start a project\" in this chat and fill in the short form — name, business, email, the service you need and a description.\n2. Or use the contact form on the Contact section.\n3. Or message us on WhatsApp: +232 70 451 369\n\nOnce we have your brief, we'll come back with a plan, timeline and a tailored quote.",
    followUps: ["What services do you offer?", "How do you work with clients?"],
  },
  {
    id: "timeline",
    intent: "timeline",
    question: "How long will my project take?",
    keywords: [
      "how long", "duration", "how fast", "quick", "turnaround", "delivery time",
      "when will it be ready", "timeframe", "lead time", "estimated time",
      "weeks", "months", "how long does it take", "how long will it take",
      "how long will my project take", "how long to build", "project timeline",
    ],
    answer:
      "Timelines depend on scope and are confirmed in your proposal:\n\n• Business websites — typically the quickest route to launch.\n• Web/mobile applications and custom platforms — longer, because they involve workflows, data and integrations.\n• AI agents and automation — scoped to your systems and data.\n\nTell us what you need and we'll give you a realistic schedule with your quote.",
    followUps: ["How do I start a project?", "How do you work with clients?"],
  },
);


/* -------------------------------------------------------------------------- */
/*                              Matching engine                              */
/* -------------------------------------------------------------------------- */

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Words that carry no intent signal and should not influence scoring. */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "do", "does", "did", "can", "could", "would",
  "you", "your", "i", "me", "my", "we", "us", "our", "to", "of", "for", "in",
  "on", "at", "with", "and", "or", "it", "this", "that", "what", "how", "much",
  "many", "please", "hi", "hello", "hey", "thanks", "thank", "there",
]);

/**
 * Scores an entry against the normalised query.
 * - Exact question match wins outright.
 * - Otherwise: keyword phrase hits are weighted by phrase length, plus a small
 *   bonus for token overlap with the entry's canonical question.
 */
function scoreEntry(entry: KnowledgeEntry, rawQuery: string, normalized: string): number {
  const q = normalized;
  if (q === normalize(entry.question)) return 1000;

  let score = 0;

  for (const keyword of entry.keywords) {
    const k = normalize(keyword);
    if (!k) continue;
    if (q.includes(k)) {
      // Longer, more specific phrases are stronger signals.
      score += 10 + k.split(" ").length * 6;
    } else {
      // Fall back to whole-word token matching for multi-word keywords.
      const tokens = k.split(" ").filter((t) => t.length > 2 && !STOP_WORDS.has(t));
      if (tokens.length > 0 && tokens.every((t) => q.includes(t))) {
        score += 4 + tokens.length * 3;
      }
    }
  }

  // Small bonus for sharing tokens with the canonical question.
  const questionTokens = normalize(entry.question)
    .split(" ").filter((t) => t.length > 2 && !STOP_WORDS.has(t));
  const matched = questionTokens.filter((t) => q.includes(t)).length;
  score += matched * 2;

  if (rawQuery.length < 3) score = 0;

  return score;
}

export interface KnowledgeMatch {
  entry: KnowledgeEntry;
  score: number;
}

/** Returns the ranked matches for a free-text query. */
export function matchKnowledge(query: string): KnowledgeMatch[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  return knowledgeEntries
    .map((entry) => ({ entry, score: scoreEntry(entry, query, normalized) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Finds the best answer for a free-text query.
 * Returns null when nothing matches with reasonable confidence.
 */
export function answerFromKnowledge(query: string): KnowledgeEntry | null {
  const matches = matchKnowledge(query);
  if (!matches.length) return null;

  const best = matches[0];
  const runnerUp = matches[1];

  // Require a clear winner, otherwise the answer would be a guess.
  if (runnerUp && best.score - runnerUp.score < 8) return null;
  return best.entry;
}

/**
 * Finds the entry that answers one of the site's suggested questions.
 * Falls back to free-text matching when the exact question is unknown.
 */
export function answerSuggestedQuestion(question: string): KnowledgeEntry | null {
  const normalized = normalize(question);
  const exact = knowledgeEntries.find((e) => normalize(e.question) === normalized);
  if (exact) return exact;

  const byIntent = matchKnowledge(question);
  return byIntent.length ? byIntent[0].entry : null;
}

/** Fallback answer used when nothing in the knowledge base matches. */
export const fallbackAnswer =
  "I don't have a specific answer for that yet, but I can help with:\n\n• Services — websites, web & mobile apps, AI agents and AI automation\n• Pricing — starting prices for each category\n• Our portfolio and process\n• Starting a project\n\nTry one of the suggested questions below, or tap \"Start a project\" and we'll pick up your brief directly.";
