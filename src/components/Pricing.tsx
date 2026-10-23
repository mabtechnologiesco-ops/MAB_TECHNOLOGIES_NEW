import { useState } from "react";
import { Check, ArrowRight, Star } from "lucide-react";
import { pricingCategories, type WebsitePackage, type TierPackage } from "@/data/pricing";
import { usePrefill, type EnquiryPrefill } from "@/lib/prefill";
import { SectionHeading } from "./SectionHeading";

type Package = WebsitePackage & { type: "website" } | TierPackage & { type: "tier" };

function tierService(id: string | undefined, name: string): string {
  if (id === "ai") {
    return name.includes("Automation") ? "AI Automation" : "AI Agent";
  }
  if (name.includes("Mobile Application")) return "Mobile Application";
  if (name.includes("Custom Digital Platform")) return "Custom Platform";
  return "Web Application";
}

interface PackageCardProps {
  pkg: Package;
  service: string;
  buttonLabel: string;
  requestEnquiry: (p: EnquiryPrefill) => void;
}

function PackageCard({ pkg, service, buttonLabel, requestEnquiry }: PackageCardProps) {
  return (
    <div
      className={`
        relative flex flex-col rounded-2xl border bg-white p-7 card-hover
        ${pkg.popular ? "border-[#078BFF] shadow-xl shadow-[#078BFF]/10" : "border-[#073D78]/10"}
      `}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-3 py-1 text-[11px] font-bold text-white">
          <Star size={11} /> POPULAR
        </span>
      )}
      <h3 className="text-lg font-bold text-[#061A38]">{pkg.name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-[#061A38]">{pkg.price}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features!.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#061A38]/75">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#078BFF]/15">
              <Check size={11} className="text-[#078BFF]" />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          requestEnquiry({ service, package: pkg.name });
        }}
        className={`
          mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all
          ${pkg.popular ? "bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white hover:scale-[1.02]" : "border border-[#073D78]/20 text-[#061A38] hover:border-[#078BFF] hover:text-[#078BFF]"}
        `}
      >
        {buttonLabel}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export function Pricing() {
  const [active, setActive] = useState<"websites" | "applications" | "ai">("websites");
  const { requestEnquiry } = usePrefill();

  const category = pricingCategories.find((c) => c.id === active)!;

  const packages: Package[] = [];
  if (category.websitePackages) {
    category.websitePackages.forEach((pkg) => packages.push({ ...pkg, type: "website" }));
  }
  if (category.tierPackages) {
    category.tierPackages.forEach((pkg) => packages.push({ ...pkg, type: "tier" }));
  }

  return (
    <section id="pricing" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="PRICING"
          title="Transparent starting prices"
          description="Clear, configurable starting prices in Sierra Leonean leones. Final quotes depend on your project's scope."
        />

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-[#073D78]/15 bg-[#F5F8FC] p-1">
            {pricingCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === c.id
                    ? "bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white shadow-md"
                    : "text-[#061A38]/70 hover:text-[#061A38]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shared package cards (identical design for Websites, Applications & AI) */}
        {packages.length > 0 && (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                service={pkg.type === "website" ? "Website Development" : tierService(category.id, pkg.name)}
                buttonLabel={pkg.type === "website" ? `Choose ${pkg.name}` : "Enquire"}
                requestEnquiry={requestEnquiry}
              />
            ))}
          </div>
        )}

        {/* Disclosure */}
        {category.disclosure && (
          <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#073D78]/10 bg-[#F5F8FC] px-5 py-4 text-center text-xs leading-relaxed text-[#061A38]/60">
            {category.disclosure}
          </p>
        )}
      </div>
    </section>
  );
}