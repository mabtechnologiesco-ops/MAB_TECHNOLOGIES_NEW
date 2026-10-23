import { useState } from "react";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { projects, portfolioFilters, type Project } from "@/data/portfolio";
import { usePrefill } from "@/lib/prefill";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>("All Projects");
  const { requestEnquiry } = usePrefill();

  const filtered =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-navy-gradient py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          dark
          eyebrow="OUR WORK"
          title="Built by MAB. Ready to be explored."
          description="A selection of websites, applications, and experiences we've designed and built."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white shadow-lg"
                  : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onBuildSimilar={() => buildSimilar(requestEnquiry, p)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function buildSimilar(
  requestEnquiry: ReturnType<typeof usePrefill>["requestEnquiry"],
  p: Project
) {
  const service = mapCategoryToService(p.category);
  requestEnquiry({
    service,
    description: `I'm interested in something similar to "${p.name}" (${p.category}).`,
  });
}

function mapCategoryToService(category: Project["category"]): string {
  switch (category) {
    case "Business Websites":
    case "Corporate Website":
    case "Construction & Engineering":
    case "Furniture":
    case "Insurance":
    case "Healthcare":
      return "Website Development";
    case "E-commerce":
      return "E-commerce";
    case "Web Applications":
      return "Web Application";
    case "AI & Automation":
      return "AI Agent";
    case "3D Experiences":
      return "Custom Digital Solution";
  }
}

function ProjectCard({
  project,
  onBuildSimilar,
}: {
  project: Project;
  onBuildSimilar: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-[#31C8FF]/40 hover:bg-white/[0.07]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} demo`}
            className="absolute inset-0 z-10"
          />
        )}
        <img
          src={project.thumbnail}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A38] via-[#061A38]/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[#061A38]/80 px-3 py-1 text-[11px] font-semibold text-[#31C8FF] backdrop-blur-sm">
          {project.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#31C8FF]/80">
          {project.category}
        </div>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 text-lg font-bold text-white transition-colors hover:text-[#31C8FF]"
          >
            {project.name}
          </a>
        ) : (
          <h3 className="mt-1.5 text-lg font-bold text-white">{project.name}</h3>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              View Live Demo
              <ExternalLink size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/40">
              {project.type === "Concept" ? "Concept project" : "Demo coming soon"}
            </span>
          )}
          <button
            onClick={onBuildSimilar}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-[#31C8FF]"
          >
            <Sparkles size={13} />
            Build Something Similar
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
