import { ArrowRight, Sparkles } from "lucide-react";
import { products, type Product } from "@/data/products";
import { SectionHeading } from "./SectionHeading";

const statusStyles: Record<Product["status"], string> = {
  "In Development": "bg-amber-100 text-amber-700 border-amber-200",
  "Coming Soon": "bg-purple-100 text-purple-700 border-purple-200",
  Available: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Beta: "bg-sky-100 text-sky-700 border-sky-200",
};

export function Products() {
  return (
    <section id="products" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="OUR PRODUCTS"
          title="Our Products"
          description="Innovation built by us. Solutions designed for you."
        />
        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#061A38]/65">
          At MAB Technologies SL, we don't just build digital solutions for businesses; we also
          develop our own products to solve real-world problems. Explore the tools and
          applications we are building to make everyday tasks simpler, smarter, and more
          efficient.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-[#073D78]/10 bg-[#F5F8FC] shadow-sm">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#061A38] to-[#073D78] p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#31C8FF] backdrop-blur-sm overflow-hidden">
              {product.logo ? (
                <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-contain" />
              ) : Icon ? (
                <Icon size={24} />
              ) : (
                <Sparkles size={24} />
              )}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">{product.name}</h3>
              <p className="text-sm text-[#31C8FF]">{product.tagline}</p>
            </div>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyles[product.status]}`}
          >
            {product.status}
          </span>
        </div>

        <div className="relative mt-6 flex justify-center">
          {product.images.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.name} screenshot ${i + 1}`}
                  loading="lazy"
                  className="h-48 w-auto rounded-2xl border border-white/10 object-cover shadow-lg"
                />
              ))}
            </div>
          ) : (
            <div className="relative mx-auto w-44">
              <div className="rounded-[2rem] border-4 border-white/20 bg-[#061A38] p-2 shadow-2xl">
                <div className="flex h-64 flex-col items-center justify-center rounded-[1.6rem] bg-gradient-to-b from-[#073D78] to-[#061A38] text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#31C8FF] overflow-hidden">
                    {product.logo ? (
                      <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-contain" />
                    ) : Icon ? (
                      <Icon size={28} />
                    ) : (
                      <Sparkles size={28} />
                    )}
                  </div>
                  <p className="mt-4 px-4 text-xs font-medium text-white/60">
                    Screenshots coming soon
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <p className="text-sm leading-relaxed text-[#061A38]/70">{product.shortDescription ?? product.description}</p>

        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#078BFF]">
            Problem it solves
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#061A38]/70">{product.problemSolved}</p>
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#078BFF]">
            Key features
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#061A38]/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#078BFF]" />
                {f}
              </li>
            ))}
          </ul>
          {product.featuresNote && (
            <p className="mt-3 text-xs italic text-[#061A38]/50">{product.featuresNote}</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {product.detailsUrl && (
            <a
              href={product.detailsUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#078BFF]/25 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {product.ctaLabel ?? "Explore Product"}
              <ArrowRight size={15} />
            </a>
          )}
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#078BFF]/30 px-5 py-2.5 text-sm font-semibold text-[#078BFF] transition-colors hover:bg-[#078BFF]/5"
            >
              Try Demo
            </a>
          )}
          {product.downloadUrl && (
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#078BFF]/30 px-5 py-2.5 text-sm font-semibold text-[#078BFF] transition-colors hover:bg-[#078BFF]/5"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

