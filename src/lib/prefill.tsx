import { createContext, useContext, useState, type ReactNode } from "react";

export interface EnquiryPrefill {
  service?: string;
  package?: string;
  description?: string;
}

interface PrefillContextValue {
  prefill: EnquiryPrefill;
  setPrefill: (p: EnquiryPrefill) => void;
  requestEnquiry: (p: EnquiryPrefill) => void;
}

const PrefillContext = createContext<PrefillContextValue | null>(null);

export function PrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefillState] = useState<EnquiryPrefill>({});

  const setPrefill = (p: EnquiryPrefill) => setPrefillState(p);

  const requestEnquiry = (p: EnquiryPrefill) => {
    setPrefillState(p);
    requestAnimationFrame(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <PrefillContext.Provider value={{ prefill, setPrefill, requestEnquiry }}>
      {children}
    </PrefillContext.Provider>
  );
}

export function usePrefill() {
  const ctx = useContext(PrefillContext);
  if (!ctx) throw new Error("usePrefill must be used within PrefillProvider");
  return ctx;
}
