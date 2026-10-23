import { SectionHeading } from "./SectionHeading";
import { maintenanceCategories, maintenanceTerms } from "@/data/maintenance";
import { MaintenanceCard } from "./MaintenanceCard";
import { usePrefill, type EnquiryPrefill } from "@/lib/prefill";

export function Maintenance() {
  const { requestEnquiry } = usePrefill();

  return (
    <section id="maintenance" className="bg-[#F5F8FC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="MAINTENANCE & SUPPORT"
          title="Keep your digital assets running smoothly"
          description="Ongoing maintenance plans for websites, applications, and AI solutions so you can focus on your business."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {maintenanceCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#078BFF]">
                {category.label}
              </h4>
              {category.tiers.map((tier) => (
                <MaintenanceCard
                  key={tier.name}
                  category={category.label}
                  tier={tier}
                  requestEnquiry={requestEnquiry}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Terms disclosure */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[#073D78]/10 bg-[#F5F8FC] p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#061A38]/60 mb-3">
            Important terms
          </h4>
          <ul className="space-y-1 text-sm text-[#061A38]/60 leading-relaxed">
            {maintenanceTerms.map((term, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#078BFF]" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}