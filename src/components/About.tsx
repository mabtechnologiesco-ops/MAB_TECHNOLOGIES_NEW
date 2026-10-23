import { Search, PenTool, Code, Rocket } from "lucide-react";
import { company } from "@/data/company";
import { SectionHeading } from "./SectionHeading";

const icons = [Search, PenTool, Code, Rocket];

export function About() {
  return (
    <section id="about" className="bg-[#F5F8FC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              center={false}
              eyebrow="ABOUT MAB TECHNOLOGIES"
              title={company.about.heading}
            />
            <div className="mt-6 space-y-4">
              {company.about.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-[#061A38]/70">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <div className="text-3xl font-extrabold text-[#078BFF]">5</div>
                <div className="text-sm text-[#061A38]/60">Service lines</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#078BFF]">4</div>
                <div className="text-sm text-[#061A38]/60">Step process</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#078BFF]">100%</div>
                <div className="text-sm text-[#061A38]/60">Sierra Leone based</div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="rounded-3xl border border-[#073D78]/10 bg-white p-7 lg:p-9">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#078BFF]">HOW WE WORK</h3>
            <div className="mt-6 space-y-6">
              {company.process.map((step, i) => {
                const Icon = icons[i];
                return (
                  <div key={step.name} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#073D78] to-[#061A38] text-[#31C8FF]">
                        <Icon size={20} />
                      </div>
                      {i < company.process.length - 1 && (
                        <div className="mt-1 h-full w-px flex-1 bg-gradient-to-b from-[#078BFF]/30 to-transparent" />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#078BFF]">0{i + 1}</span>
                        <h4 className="text-base font-bold text-[#061A38]">{step.name}</h4>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[#061A38]/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
