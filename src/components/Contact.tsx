import { useEffect, useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { serviceOptionsForForm } from "@/data/services";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { usePrefill } from "@/lib/prefill";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const { prefill } = usePrefill();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
    service: "",
    package: "",
    project_description: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: prefill.service || f.service,
      package: prefill.package || f.package,
      project_description: prefill.description || f.project_description,
    }));
  }, [prefill]);

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (!form.service) return "Please select a service.";
    if (!form.project_description.trim() || form.project_description.trim().length < 10)
      return "Please describe your project (at least 10 characters).";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus("error");
      setErrorMsg(err);
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("enquiries").insert({
          name: form.name.trim(),
          business_name: form.business_name.trim() || null,
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          service_requested: form.service,
          package_requested: form.package || null,
          project_description: form.project_description.trim(),
          source: "contact_form",
          status: "new",
        });
        if (error) throw new Error(error.message);
        setStatus("success");
      } else {
        // No Supabase — fall back to WhatsApp with prefilled message
        const msg = `Hello MAB Technologies, I'd like to enquire.\n\nName: ${form.name}\nBusiness: ${form.business_name || "-"}\nEmail: ${form.email}\nPhone: ${form.phone || "-"}\nService: ${form.service}\nPackage: ${form.package || "-"}\n\nProject: ${form.project_description}`;
        window.open(`${company.whatsapp.url.split("?text=")[0]}?text=${encodeURIComponent(msg)}`, "_blank");
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp instead."
      );
    }
  };

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="CONTACT"
          title="Have an idea? Let's build it."
          description="Share a few details about your project and we'll get back to you."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#073D78]/10 bg-[#F5F8FC] p-7 lg:col-span-3 lg:p-9"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={48} className="text-[#078BFF]" />
                <h3 className="mt-4 text-xl font-bold text-[#061A38]">Enquiry received</h3>
                <p className="mt-2 max-w-sm text-sm text-[#061A38]/60">
                  Thank you, {form.name.split(" ")[0]}. Our team will contact you soon. For urgent
                  matters, reach us on WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({
                      name: "",
                      business_name: "",
                      email: "",
                      phone: "",
                      service: "",
                      package: "",
                      project_description: "",
                    });
                  }}
                  className="mt-6 rounded-full border border-[#073D78]/20 px-5 py-2.5 text-sm font-semibold text-[#061A38] hover:border-[#078BFF] hover:text-[#078BFF]"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputCls}
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Business name" optional>
                  <input
                    type="text"
                    value={form.business_name}
                    onChange={(e) => update("business_name", e.target.value)}
                    className={inputCls}
                    placeholder="Your business (optional)"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputCls}
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="Phone" optional>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputCls}
                    placeholder="+232 ..."
                  />
                </Field>
                <Field label="Service" required>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select a service</option>
                    {serviceOptionsForForm.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Package" optional>
                  <input
                    type="text"
                    value={form.package}
                    onChange={(e) => update("package", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Business, Premium (optional)"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Project description" required>
                    <textarea
                      value={form.project_description}
                      onChange={(e) => update("project_description", e.target.value)}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell us what you'd like to build..."
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <div className="sm:col-span-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#078BFF]/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send enquiry"}
                    <Send size={15} />
                  </button>
                  <a
                    href={company.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#061A38]/70 hover:text-[#078BFF]"
                  >
                    <MessageCircle size={15} />
                    Or message us on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </form>

          {/* Contact info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl bg-navy-gradient p-7 text-white">
              <h3 className="text-lg font-bold">Contact details</h3>
              <div className="mt-5 space-y-4">
                <ContactRow icon={<Mail size={18} />} label="Email" value={company.emails[0]} href={`mailto:${company.emails[0]}`} />
                {company.phones.map((p) => (
                  <ContactRow key={p} icon={<Phone size={18} />} label="Phone" value={p} href={`tel:${p.replace(/\s/g, "")}`} />
                ))}
                <ContactRow icon={<MapPin size={18} />} label="Location" value={company.location} />
              </div>
            </div>

            <div className="rounded-3xl border border-[#073D78]/10 bg-[#F5F8FC] p-7">
              <h3 className="text-sm font-bold text-[#061A38]">Prefer to chat now?</h3>
              <p className="mt-2 text-sm text-[#061A38]/60">
                Use the AI assistant at the bottom-left, or open a direct WhatsApp conversation.
              </p>
              <a
                href={company.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[#073D78]/15 bg-white px-4 py-2.5 text-sm text-[#061A38] outline-none transition-colors placeholder:text-[#061A38]/30 focus:border-[#078BFF] focus:ring-2 focus:ring-[#078BFF]/20";

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#061A38]/70">
        {label}
        {required && <span className="text-[#078BFF]"> *</span>}
        {optional && <span className="text-[#061A38]/40"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#31C8FF]">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-white/40">{label}</div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
