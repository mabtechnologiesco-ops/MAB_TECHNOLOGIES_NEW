import { ArrowRight, Play, Globe, Smartphone, Bot, Workflow } from "lucide-react";
import { company } from "@/data/company";

export function Hero({ onBuild, onExplore }: { onBuild: () => void; onExplore: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-radial pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#31C8FF]/30 bg-[#31C8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#31C8FF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#31C8FF] animate-pulse" />
            {company.hero.eyebrow}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-white">{company.hero.headingLine1}</span>
            <span className="block text-gradient-blue">{company.hero.headingLine2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {company.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onBuild}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#078BFF]/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Let's Build Something
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Play size={16} />
              Explore Our Work
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/55">
            <span>5 service lines</span>
            <span className="text-white/20">|</span>
            <span>Websites, Apps & AI</span>
            <span className="text-white/20">|</span>
            <span>Based in {company.location}</span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-lg">
      {/* glow */}
      <div className="absolute -inset-6 rounded-[2rem] bg-[#078BFF]/20 blur-3xl" />

      {/* Laptop mockup */}
      <div className="relative rounded-2xl border border-white/15 bg-[#0a2244]/80 p-3 shadow-2xl backdrop-blur-sm glow-blue">
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] text-white/40">mabtechnologies.sl</span>
        </div>
        <div className="overflow-hidden rounded-lg bg-gradient-to-br from-[#061A38] to-[#0a2244] p-5">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-24 rounded-full bg-[#31C8FF]/60" />
            <div className="flex gap-2">
              <div className="h-2 w-10 rounded-full bg-white/15" />
              <div className="h-2 w-10 rounded-full bg-white/15" />
              <div className="h-2 w-12 rounded-full bg-[#078BFF]" />
            </div>
          </div>
          <div className="mt-5">
            <div className="h-5 w-3/4 rounded-md bg-white/80" />
            <div className="mt-2 h-5 w-1/2 rounded-md bg-gradient-to-r from-[#078BFF] to-[#31C8FF]" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[Globe, Smartphone, Bot].map((Icon, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <Icon size={18} className="text-[#31C8FF]" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#078BFF]/15 p-3">
            <div className="flex items-center gap-2">
              <Workflow size={16} className="text-[#31C8FF]" />
              <div className="h-1.5 w-20 rounded-full bg-white/20" />
            </div>
            <div className="h-5 w-16 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF]" />
          </div>
        </div>
      </div>

      {/* Mobile mockup */}
      <div className="absolute -bottom-8 -left-6 hidden w-28 animate-float rounded-2xl border border-white/15 bg-[#0a2244]/90 p-2 shadow-xl backdrop-blur-sm sm:block">
        <div className="rounded-lg bg-gradient-to-b from-[#061A38] to-[#0a2244] p-3">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
          <div className="mt-3 h-2 w-16 rounded-full bg-[#31C8FF]/70" />
          <div className="mt-2 h-2 w-10 rounded-full bg-white/15" />
          <div className="mt-3 space-y-1.5">
            <div className="h-8 rounded-md bg-white/5" />
            <div className="h-8 rounded-md bg-white/5" />
            <div className="h-8 rounded-md bg-[#078BFF]/30" />
          </div>
        </div>
      </div>

      {/* AI assistant chip */}
      <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-xl border border-white/15 bg-[#0a2244]/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF]">
          <Bot size={14} className="text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-white">AI Assistant</div>
          <div className="text-[9px] text-[#31C8FF]">● online</div>
        </div>
      </div>
    </div>
  );
}
