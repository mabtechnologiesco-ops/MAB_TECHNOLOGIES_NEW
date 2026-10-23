import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { usePrefill } from "@/lib/prefill";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  const { requestEnquiry } = usePrefill();

  return (
    <section id="services" className="bg-[#F5F8FC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="Services built for modern businesses"
          description="Five focused service lines that take your idea from imagination to a working digital product."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                className="card-hover group flex flex-col rounded-2xl border border-[#073D78]/10 bg-white p-6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#073D78] to-[#061A38] text-[#31C8FF] shadow-md">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#061A38]">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#061A38]/65">{s.short}</p>

                <ul className="mt-4 space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#061A38]/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#078BFF]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => requestEnquiry({ service: s.name })}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#078BFF] transition-colors hover:text-[#31C8FF]"
                >
                  Enquire about this
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </article>
            );
          })}

          {/* CTA tile */}
          <div className="flex flex-col justify-center rounded-2xl bg-navy-gradient p-6 text-white">
            <h3 className="text-lg font-bold">Not sure which fits?</h3>
            <p className="mt-2 text-sm text-white/70">
              Tell us about your business and we'll recommend the right approach.
            </p>
            <button
              onClick={() => requestEnquiry({ service: "Custom Digital Solution" })}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Get a recommendation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
