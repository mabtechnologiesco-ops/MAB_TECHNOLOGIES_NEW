import { Check, ArrowRight } from "lucide-react";
import { MaintenanceTier } from "@/data/maintenance";

interface MaintenanceCardProps {
  category: string;
  tier: MaintenanceTier;
  requestEnquiry: (p: { service: string; package?: string }) => void;
}

export function MaintenanceCard({ category, tier, requestEnquiry }: MaintenanceCardProps) {
  return (
    <div
      className={`\n        relative flex flex-col rounded-2xl border bg-white p-7 card-hover\n        ${tier.featured ? "border-[#078BFF] shadow-xl shadow-[#078BFF]/10" : "border-[#073D78]/10"}\n      `}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-3 py-1 text-[11px] font-bold text-white">
          <Check size={11} /> RECOMMENDED
        </span>
      )}
      <h3 className="text-lg font-bold text-[#061A38]">{tier.name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-[#061A38]">{tier.price}</span>
        <span className="text-sm font-medium text-[#061A38]/50">{tier.period}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
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
          requestEnquiry({ service: category, package: tier.name });
        }}
        className={`\n          mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all\n          ${tier.featured ? "bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white hover:scale-[1.02]" : "border border-[#073D78]/20 text-[#061A38] hover:border-[#078BFF] hover:text-[#078BFF]"}\n        `}
      >
        Get Maintenance
        <ArrowRight size={15} />
      </button>
    </div>
  );
}