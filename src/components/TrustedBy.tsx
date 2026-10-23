import { clients } from "@/data/clients";
import { SectionHeading } from "./SectionHeading";

export function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="relative overflow-hidden bg-[#F5F8FC] py-16 lg:py-20"
      aria-label="Businesses that trust MAB Technologies"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="TRUSTED BY"
          title="Businesses That Trust Us"
          description="Building strong partnerships through innovative technology and digital solutions."
        />
      </div>

      <div className="relative mt-12">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F8FC] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F8FC] to-transparent sm:w-24" />

        <div className="overflow-hidden">
          <div className="flex w-max animate-business-slide hover:[animation-play-state:paused] motion-reduce:animate-none">
            <div className="flex shrink-0 items-center gap-10 sm:gap-16">
              {clients.map((client) => {
                const content = (
                  <span className="flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-auto max-w-[140px] object-contain sm:h-12"
                    />
                    <span className="text-sm font-semibold text-[#061A38] sm:text-base">
                      {client.name}
                    </span>
                  </span>
                );

                return (
                  <div key={client.id} className="shrink-0">
                    {client.website ? (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#078BFF] focus-visible:ring-offset-2"
                        aria-label={`Visit ${client.name}`}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
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
