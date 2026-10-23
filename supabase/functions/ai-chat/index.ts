/// <reference types="@deno/types" />

import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  context?: {
    service?: string;
    package?: string;
  };
  action?: "chat" | "submit_enquiry";
  enquiry?: {
    name: string;
    business_name?: string;
    email: string;
    phone?: string;
    service_requested: string;
    package_requested?: string;
    project_description: string;
    source?: string;
  };
}

// Centralized, authoritative business data mirrored from the website config.
// This is the ONLY data the AI is allowed to reference for prices/services/portfolio.
const BUSINESS_CONTEXT = {
  company: {
    name: "MAB Technologies SL",
    tagline: "YOU IMAGINE IT. WE BUILD IT.",
    brand_statement: "Smart Solutions for a Stronger Digital Future.",
    location: "Sierra Leone",
    emails: ["mabtechnologies.co@gmail.com"],
    phones: ["+23270451369", "+23278968909"],
    whatsapp: "https://wa.me/23270451369",
  },
  services: [
    {
      name: "Website Development",
      description:
        "Business websites, corporate websites, landing pages, restaurant/hotel websites, portfolios, and e-commerce.",
    },
    {
      name: "Web Applications",
      description:
        "Booking systems, ordering platforms, customer portals, dashboards, inventory systems, and business software.",
    },
    {
      name: "Mobile Applications",
      description:
        "Customer apps, booking apps, marketplaces, and custom apps for iOS and Android.",
    },
    {
      name: "AI Agents",
      description:
        "Website assistants, customer support, business knowledge, and lead qualification agents.",
    },
    {
      name: "AI Automation",
      description:
        "Workflow automation, enquiry processing, notifications, and business integrations.",
    },
  ],
  pricing: {
    websites: [
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
    applications: [
      { name: "Web Application", price: "from SLE 15,000" },
      { name: "Mobile Application", price: "from SLE 25,000" },
      { name: "Custom Digital Platform", price: "from SLE 30,000" },
    ],
    ai: [
      { name: "AI Website Assistant", price: "from SLE 5,000" },
      { name: "AI Business Automation", price: "from SLE 7,500" },
      { name: "AI Customer Support Agent", price: "from SLE 10,000" },
      { name: "Custom AI Agent System", price: "from SLE 15,000" },
    ],
  },
  pricing_notes: [
    "Final application and AI prices depend on functionality, integrations, security, complexity, and deployment requirements.",
    "AI implementation fees do not automatically include unlimited AI usage, hosting, subscriptions, or maintenance.",
    "These are configurable starting prices, not guaranteed quotes for every project.",
    "Domain and hosting renewal terms are disclosed per project. No free domain is promised unless explicitly included in an offer.",
  ],
  portfolio: [
    {
      name: "Chocolate & Cake Ordering Platform",
      category: "E-commerce",
      description: "A modern online ordering platform for chocolate and cake businesses.",
      type: "Web Application",
    },
    {
      name: "Construction & Engineering Company Website",
      category: "Construction & Engineering",
      description: "A professional corporate website for a construction and engineering company.",
      type: "Live Website",
    },
    {
      name: "Hospital Website",
      category: "Healthcare",
      description: "A professional healthcare website for hospital information and services.",
      type: "Live Website",
    },
    {
      name: "Building Materials Ordering Platform",
      category: "E-commerce",
      description: "A digital ordering platform for building-material suppliers.",
      type: "Web Application",
    },
    {
      name: "Insurance Company Website",
      category: "Insurance",
      description: "A professional insurance company website presenting services and company information.",
      type: "Live Website",
    },
    {
      name: "Furniture Company Website",
      category: "Furniture",
      description: "A modern furniture company website showcasing furniture collections.",
      type: "Live Website",
    },
    {
      name: "Harte Perfume",
      category: "E-commerce",
      description: "Fragrance brand e-commerce experience with product showcase.",
      type: "Live Website",
    },
    {
      name: "Restaurant Ordering Platform",
      category: "Web Applications",
      description: "Online ordering platform for restaurants with menu and order flow.",
      type: "Web Application",
    },
    {
      name: "Cleaning Agency Website",
      category: "Business Websites",
      description: "Professional service website concept for a cleaning agency.",
      type: "Live Website",
    },
    {
      name: "AI Customer Support Agent",
      category: "AI & Automation",
      description: "Concept for an AI support assistant for customer questions and lead qualification.",
      type: "Concept",
    },
    {
      name: "3D Interactive Website",
      category: "3D Experiences",
      description: "Immersive 3D web experience concept.",
      type: "Concept",
    },
    {
      name: "Business Website Concept",
      category: "Business Websites",
      description: "Clean corporate website concept for professional service firms.",
      type: "Concept",
    },
  ],
  process: ["Discover", "Design", "Build", "Launch & Support"],
};

const SYSTEM_PROMPT = `You are the MAB Technologies SL AI assistant. You help visitors understand MAB's services, pricing, and portfolio, and collect project enquiries.

STRICT RULES:
- Only use the provided business data. Never invent prices, features, demo links, testimonials, or client claims.
- Prices are in Sierra Leonean leones (SLE) and are starting prices, not guaranteed quotes.
- Be concise, professional, and helpful. Keep replies under 180 words unless listing pricing.
- If a visitor wants to start a project, encourage them to use the contact form or WhatsApp.
- Never claim a demo URL exists if it is not in the provided data.
- You represent MAB Technologies SL, a Sierra Leone technology company.

BUSINESS DATA (authoritative source):
${JSON.stringify(BUSINESS_CONTEXT, null, 0)}`;

function buildSystemPrompt(extra?: string): string {
  return extra ? `${SYSTEM_PROMPT}\n\nADDITIONAL CONTEXT: ${extra}` : SYSTEM_PROMPT;
}

function fallbackReply(userText: string): string {
  const t = userText.toLowerCase();
  const p = BUSINESS_CONTEXT.pricing;

  if (t.includes("website") && (t.includes("cost") || t.includes("price") || t.includes("how much"))) {
    return `Website pricing at MAB Technologies (in SLE):\n\n• Starter — SLE 3,000 (1–3 pages, responsive, basic SEO)\n• Business — SLE 5,000 (4–7 pages, custom design, contact form)\n• Premium — SLE 10,000 (premium design, advanced interactions, lead-gen features)\n\nThese are starting prices. Share your requirements via the contact form or WhatsApp for a tailored quote.`;
  }
  if (t.includes("e-commerce")) {
    return `Yes — we build e-commerce websites under our Website Development service, with product showcase and ordering capabilities. E-commerce typically fits the Business or Premium website tier depending on scope. Tell us about your products via the contact form for a specific quote.`;
  }
  if (t.includes("mobile app")) {
    return `Yes — MAB Technologies builds mobile applications (customer apps, booking apps, marketplaces, custom apps). Mobile applications start from SLE 25,000. Final pricing depends on features, platforms, and integrations.`;
  }
  if (t.includes("web app") || t.includes("web application") || t.includes("booking") || t.includes("portal") || t.includes("dashboard")) {
    return `We build web applications — booking systems, ordering platforms, customer portals, dashboards, and inventory systems. Web applications start from SLE 15,000; custom digital platforms from SLE 30,000. Pricing depends on functionality and complexity.`;
  }
  if (t.includes("ai agent")) {
    return `Our AI agents:\n• AI Website Assistant — from SLE 5,000\n• AI Customer Support Agent — from SLE 10,000\n• Custom AI Agent System — from SLE 15,000\n\nImplementation fees do not include unlimited AI usage, hosting, subscriptions, or maintenance. Contact us to scope your use case.`;
  }
  if (t.includes("automat")) {
    return `AI Business Automation starts from SLE 7,500. We automate workflows, enquiry processing, notifications, and business integrations. Pricing depends on the systems involved and complexity.`;
  }
  if (t.includes("portfolio") || t.includes("work") || t.includes("projects")) {
    const names = BUSINESS_CONTEXT.portfolio.map((x) => `${x.name} (${x.category}, ${x.type})`).join("; ");
    return `Our portfolio includes: ${names}. Visit the Our Work section to explore each project. Use "Build Something Similar" on any project to start an enquiry.`;
  }
  if (t.includes("contact") || t.includes("reach") || t.includes("email") || t.includes("phone") || t.includes("whatsapp")) {
    return `You can reach MAB Technologies at:\n• Email: mabtechnologies.co@gmail.com\n• Phone: +23270451369 or +23278968909\n• WhatsApp: wa.me/23270451369\nOr use the contact form on the Contact section.`;
  }
  if (t.includes("service") || t.includes("offer") || t.includes("do you")) {
    const list = BUSINESS_CONTEXT.services.map((s) => `${s.name}: ${s.description}`).join("\n");
    return `MAB Technologies offers:\n${list}\n\nWhich area interests you? I can share pricing or help you start a project.`;
  }
  if (t.includes("price") || t.includes("cost") || t.includes("how much")) {
    return `Our pricing categories:\n• Websites — SLE 3,000 to SLE 10,000\n• Applications — from SLE 15,000 to SLE 30,000\n• AI Solutions — from SLE 5,000 to SLE 15,000\n\nWhich category would you like details on?`;
  }
  return `I'm the MAB Technologies assistant. I can help with our services (websites, web apps, mobile apps, AI agents, AI automation), pricing, and portfolio — or help you start a project. What would you like to know?\n\nNote: I'm currently running in offline mode. For AI-powered conversations, connect an AI provider key. You can also reach us on WhatsApp or via the contact form.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as ChatRequest;
    const action = body.action || "chat";

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Handle enquiry submission through the backend (service role bypasses RLS for INSERT).
    if (action === "submit_enquiry" && body.enquiry) {
      if (!supabaseUrl || !serviceRoleKey) {
        return new Response(
          JSON.stringify({ error: "Enquiry storage is not configured. Please use WhatsApp or the contact form." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const e = body.enquiry;
      if (!e.name || !e.email || !e.service_requested || !e.project_description) {
        return new Response(
          JSON.stringify({ error: "Missing required enquiry fields." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const { error } = await supabase.from("enquiries").insert({
        name: e.name,
        business_name: e.business_name || null,
        email: e.email,
        phone: e.phone || null,
        service_requested: e.service_requested,
        package_requested: e.package_requested || null,
        project_description: e.project_description,
        source: e.source || "ai_assistant",
        status: "new",
      });
      if (error) {
        return new Response(
          JSON.stringify({ error: "Could not store your enquiry. Please try the contact form or WhatsApp." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ message: "Thank you! Your enquiry has been received. Our team will contact you soon." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Chat action
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic validation / length guard
    const recent = messages.slice(-20);
    for (const m of recent) {
      if (typeof m.content !== "string" || m.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Invalid message format." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const aiKey = Deno.env.get("OPENAI_API_KEY") || Deno.env.get("AI_API_KEY");

    if (!aiKey) {
      const last = recent[recent.length - 1];
      const reply = fallbackReply(last?.content || "");
      return new Response(
        JSON.stringify({ reply, offline: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contextHint = body.context?.service
      ? `The visitor was viewing the ${body.context.service} service${body.context.package ? ` (${body.context.package} package)` : ""}.`
      : undefined;

    const model = Deno.env.get("AI_MODEL") || "gemini-1.5-flash-latest";
    const apiUrl = Deno.env.get("AI_API_URL") || `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiKey}`;

    // Convert OpenAI-style messages to Gemini format
    const systemPrompt = buildSystemPrompt(contextHint);
    const contents = recent.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("AI provider error:", resp.status, errText);
      const last = recent[recent.length - 1];
      return new Response(
        JSON.stringify({ reply: fallbackReply(last?.content || ""), offline: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      fallbackReply(recent[recent.length - 1]?.content || "");

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("ai-chat error:", err);
    return new Response(
      JSON.stringify({
        reply:
          "I'm having trouble responding right now. Please reach us on WhatsApp at +23270451369 or via the contact form.",
        offline: true,
        error: true,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
