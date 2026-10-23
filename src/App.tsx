import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Maintenance } from "@/components/Maintenance";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PrefillProvider, usePrefill } from "@/lib/prefill";

function AppContent() {
  const { requestEnquiry } = usePrefill();

  const startProject = () =>
    requestEnquiry({ description: "" });

  const exploreWork = () => {
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onStartProject={startProject} />
      <main>
        <Hero onBuild={startProject} onExplore={exploreWork} />
        <Services />
        <Pricing />
        <Maintenance />
        <Portfolio />
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
