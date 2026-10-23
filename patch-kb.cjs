const fs = require("fs");
const path = "src/lib/knowledge.ts";
let s = fs.readFileSync(path, "utf8");

const replacements = [
  {
    from: /answer:\s*\n\s*"Website pricing at MAB Technologies \(in SLE\):[\s\S]*?tailored quote\.",/,
    to: "answer: websitePricingAnswer(),",
  },
  {
    from: /answer:\s*\n\s*"Application pricing at MAB Technologies \(in SLE\):[\s\S]*?scope your project\.",/,
    to: 'answer:\n      tierPricingAnswer(\n        "Application",\n        pricingInfo.applications,\n        "Final prices depend on functionality, integrations, security, complexity and deployment requirements. Contact us to scope your project.",\n      ),',
  },
  {
    from: /answer:\s*\n\s*"AI Solutions pricing at MAB Technologies \(in SLE\):[\s\S]*?tailored quote\.",/,
    to: 'answer:\n      tierPricingAnswer(\n        "AI Solutions",\n        pricingInfo.ai,\n        "Implementation fees do not automatically include unlimited AI usage, hosting, subscriptions, or maintenance. Domain and hosting renewal terms are disclosed per project. Share your use case for a tailored quote.",\n      ),',
  },
];

for (const r of replacements) {
  if (!r.from.test(s)) {
    console.error("NO MATCH for: " + r.from.source.slice(0, 60));
    process.exit(1);
  }
  s = s.replace(r.from, r.to);
}

fs.writeFileSync(path, s);
console.log("patched " + replacements.length + " answers");
