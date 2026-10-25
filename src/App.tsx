import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Maintenance } from "@/components/Maintenance";
import { Portfolio } from "@/components/Portfolio";
import { Products } from "@/components/Products";
import { ProductDetail } from "@/components/ProductDetail";
import { TrustedBy } from "@/components/TrustedBy";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PrefillProvider, usePrefill } from "@/lib/prefill";

function getPathname() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function AppContent() {
  const { requestEnquiry } = usePrefill();
  const [path, setPath] = useState(getPathname());

  useEffect(() => {
    const onPop = () => setPath(getPathname());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const startProject = () => requestEnquiry({ description: "" });

  const exploreWork = () => {
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Product detail route: /products/:slug
  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    return (
      <div className="min-h-screen bg-white">
        <ProductDetail slug={decodeURIComponent(productMatch[1])} />
        <AIAssistant />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onStartProject={startProject} />
      <main>
        <Hero onBuild={startProject} onExplore={exploreWork} />
        <Services />
        <Pricing />
        <Maintenance />
        <Portfolio />
        <Products />
        <TrustedBy />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Floating buttons — AI bottom-left, WhatsApp bottom-right */}
      <AIAssistant />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <PrefillProvider>
      <AppContent />
    </PrefillProvider>
  );
}
