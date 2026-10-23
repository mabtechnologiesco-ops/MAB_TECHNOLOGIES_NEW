import { Logo } from "./Logo";
import { company } from "@/data/company";
import { services } from "@/data/services";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Work", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#04122A] py-14 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {company.brandStatement}
            </p>
            <p className="mt-3 text-sm font-semibold text-gradient-blue">{company.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">Navigation</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-[#31C8FF]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-sm text-white/55 transition-colors hover:text-[#31C8FF]">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">Contact</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${company.emails[0]}`} className="text-sm text-white/55 hover:text-[#31C8FF]">
                  {company.emails[0]}
                </a>
              </li>
              {company.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-sm text-white/55 hover:text-[#31C8FF]">
                    {p}
                  </a>
                </li>
              ))}
              <li className="text-sm text-white/55">{company.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
