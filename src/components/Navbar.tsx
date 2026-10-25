import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onStartProject }: { onStartProject: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#061A38]/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="shrink-0" aria-label="MAB Technologies home">
          <Logo size="lg" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-[#31C8FF]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button
            onClick={onStartProject}
            className="rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#078BFF]/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Start a Project
          </button>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden">
          <div className="mx-5 mt-3 rounded-2xl border border-white/10 bg-[#061A38]/95 p-4 backdrop-blur-md">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-[#31C8FF]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    onStartProject();
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Start a Project
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
