import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  ScanLine,
  WifiOff,
  Cloud,
  History,
  SlidersHorizontal,
  KeyRound,
  ArrowRightLeft,
  Printer,
  Zap,
  RefreshCw,
  Building2,
  UserCheck,
  Briefcase,
  Wallet,
  Users,
} from "lucide-react";
import { getProductBySlug, type Product } from "@/data/products";
import { SectionHeading } from "./SectionHeading";

const statusStyles: Record<Product["status"], string> = {
  "In Development": "bg-amber-100 text-amber-700 border-amber-200",
  "Coming Soon": "bg-purple-100 text-purple-700 border-purple-200",
  Available: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Beta: "bg-sky-100 text-sky-700 border-sky-200",
};

const sectionIcons: Record<string, typeof ScanLine> = {
  "Smart Automatic Cash Counting": ScanLine,
  "Works Online and Offline": WifiOff,
  "Automatic Saving and Synchronization": Cloud,
  "Complete Counting History": History,
  "Flexible Note Management": SlidersHorizontal,
  "Account-Based Data Access": KeyRound,
  "Export and Import Your Data": ArrowRightLeft,
  "Print Your Calculations for Proof and Recordkeeping": Printer,
};

const benefitIcons: Record<string, typeof Zap> = {
  "Count Faster": Zap,
  "Work Anywhere": WifiOff,
  "Keep Your Records": History,
  "Stay Synchronized": RefreshCw,
  "Adjust with Ease": SlidersHorizontal,
  "Access Your Account": KeyRound,
  "Export and Import": ArrowRightLeft,
  "Print with Confidence": Printer,
};

const audienceIcons = [Building2, UserCheck, Briefcase, Wallet, Users];

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | MAB Technologies SL`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", product.description);
    } else {
      document.title = "Product not found | MAB Technologies SL";
    }
    return () => {
      document.title = "MAB Technologies SL | Websites, Apps & AI Solutions";
    };
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#061A38]">Product not found</h1>
          <p className="mt-3 text-[#061A38]/60">The product you're looking for doesn't exist.</p>
          <a href="/" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white">
            <ArrowLeft size={15} /> Back to home
          </a>
        </div>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[#073D78]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#078BFF] hover:text-[#31C8FF]">
            <ArrowLeft size={15} /> Back to MAB Technologies
          </a>
          <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyles[product.status]}`}>
            {product.status}
          </span>
        </div>
      </div>

      <section className="bg-navy-gradient py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#31C8FF] overflow-hidden">
                  {product.logo ? (
                    <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-contain" />
                  ) : Icon ? (
                    <Icon size={28} />
                  ) : (
                    <Smartphone size={28} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#31C8FF]">Our Product</p>
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{product.name}</h1>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium text-[#31C8FF]">{product.tagline}</p>
              <p className="mt-5 text-base leading-relaxed text-white/75">{product.shortDescription ?? product.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {product.ctaLabel && (
                  <a href="/#contact" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#078BFF]/30 transition-transform hover:scale-[1.03] active:scale-95">
                    {product.closingCta ?? product.ctaLabel} <ArrowRight size={15} />
                  </a>
                )}
                <a href="/" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  <ArrowLeft size={15} /> Back to home
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              {product.images.length > 0 ? (
                <div className="relative mx-auto w-64 sm:w-72">
                  <div className="rounded-[2.6rem] border-4 border-white/20 bg-[#061A38] p-2 shadow-2xl">
                    <div className="overflow-hidden rounded-[2.2rem] bg-[#061A38]">
                      <img
                        src={product.images[0]}
                        alt={`${product.name} app screen`}
                        loading="lazy"
                        className="h-[520px] w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-[#061A38]" />
                </div>
              ) : (
                <div className="w-full max-w-sm rounded-[2rem] border-4 border-white/20 bg-[#061A38] p-2 shadow-2xl">
                  <div className="flex h-80 flex-col items-center justify-center rounded-[1.6rem] bg-gradient-to-b from-[#073D78] to-[#061A38] text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#31C8FF] overflow-hidden">
                      {product.logo ? (
                        <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-contain" />
                      ) : Icon ? (
                        <Icon size={32} />
                      ) : (
                        <Smartphone size={32} />
                      )}
                    </div>
                    <p className="mt-4 px-4 text-xs font-medium text-white/60">Screenshots coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-extrabold text-[#061A38]">About {product.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-[#061A38]/75">{product.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#061A38]">The problem it solves</h2>
                <p className="mt-4 text-base leading-relaxed text-[#061A38]/75">{product.problemSolved}</p>
              </div>

              {product.detailSections && product.detailSections.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#061A38]">Features</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {product.detailSections.map((section) => {
                      const SIcon = sectionIcons[section.title] ?? CheckCircle2;
                      return (
                        <div key={section.title} className="rounded-2xl border border-[#073D78]/10 bg-[#F5F8FC] p-5 transition-shadow hover:shadow-md">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#078BFF]/10 text-[#078BFF]">
                            <SIcon size={20} />
                          </div>
                          <h3 className="mt-4 text-base font-bold text-[#061A38]">{section.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#061A38]/70">{section.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#061A38]">Benefits</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.benefits.map((b) => {
                      const BIcon = benefitIcons[b.title] ?? CheckCircle2;
                      return (
                        <div key={b.title} className="flex items-start gap-3 rounded-2xl border border-[#073D78]/10 bg-white p-4 shadow-sm">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#078BFF] to-[#31C8FF] text-white">
                            <BIcon size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-[#061A38]">{b.title}</h3>
                            <p className="mt-1 text-sm text-[#061A38]/65">{b.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {product.audience && product.audience.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#061A38]">Who is Eazy Check for?</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {product.audience.map((a, i) => {
                      const AIcon = audienceIcons[i % audienceIcons.length];
                      return (
                        <li key={a} className="flex items-center gap-3 rounded-2xl border border-[#073D78]/10 bg-[#F5F8FC] p-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#078BFF]/10 text-[#078BFF]">
                            <AIcon size={18} />
                          </div>
                          <span className="text-sm text-[#061A38]/75">{a}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {product.images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#061A38]">Screenshots</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {product.images.map((src, i) => (
                      <img key={i} src={src} alt={`${product.name} screenshot ${i + 1}`} className="rounded-2xl border border-[#073D78]/10 object-cover shadow-md" />
                    ))}
                  </div>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-[#061A38]">Key features</h2>
                  {product.featuresNote && (
                    <p className="mt-2 text-sm italic text-[#061A38]/50">{product.featuresNote}</p>
                  )}
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 rounded-2xl border border-[#073D78]/10 bg-[#F5F8FC] p-4">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#078BFF]" />
                        <span className="text-sm text-[#061A38]/75">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-[#073D78]/10 bg-[#F5F8FC] p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#078BFF]">Status</h3>
                <p className="mt-2 text-base font-semibold text-[#061A38]">{product.status}</p>
                <p className="mt-2 text-sm text-[#061A38]/60">
                  {product.status === "In Development"
                    ? "We are actively building this product. Features and availability may evolve."
                    : product.status === "Coming Soon"
                    ? "Launching soon. Stay tuned for updates."
                    : "Available now."}
                </p>
              </div>

              <div className="rounded-2xl border border-[#073D78]/10 bg-[#F5F8FC] p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#078BFF]">Interested?</h3>
                <p className="mt-2 text-sm text-[#061A38]/60">
                  Want to learn more, request early access, or partner with us on this product?
                </p>
                <a href="/#contact" className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
                  Contact Us <ArrowRight size={15} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-navy-gradient py-16">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <SectionHeading dark eyebrow="MAB TECHNOLOGIES SL" title="Building products that solve real problems" description="Eazy Check is just the beginning. More MAB-owned products are on the way." />
          {product.closing && (
            <p className="mt-6 text-base leading-relaxed text-white/75">{product.closing}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/#contact" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#078BFF]/30 transition-transform hover:scale-[1.03] active:scale-95">
              {product.closingCta ?? "Get Started"} <ArrowRight size={15} />
            </a>
            <a href="/" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <ArrowLeft size={15} /> Back to home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
