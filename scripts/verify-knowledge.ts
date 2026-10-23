// Temporary verification harness for the knowledge base matcher.
import { answerSuggestedQuestion, answerFromKnowledge, knowledgeEntries } from "../src/lib/knowledge";

const SUGGESTED = [
  "How much does a website cost?",
  "Can you build an e-commerce website?",
  "Can you build a mobile app?",
  "What AI agents do you offer?",
  "How can I automate my business?",
  "Can I see your portfolio?",
  "How can I contact you?",
];

let failures = 0;

console.log("=== Suggested questions ===");
for (const q of SUGGESTED) {
  const e = answerSuggestedQuestion(q);
  const ok = e && e.question === q;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"} | "${q}" -> ${e ? e.question : "NO MATCH"}`);
}

console.log("\n=== Free-text variants ===");
const variants = [
  ["how much for a website", "How much does a website cost?"],
  ["website prices", "How much does a website cost?"],
  ["do you make online stores", "Can you build an e-commerce website?"],
  ["can you make an android app", "Can you build a mobile app?"],
  ["do you offer chatbots", "What AI agents do you offer?"],
  ["help me automate my company", "How can I automate my business?"],
  ["show me your projects", "Can I see your portfolio?"],
  ["what is your email address", "How can I contact you?"],
  ["what services do you provide", "What services do you offer?"],
  ["who are you", "Who is MAB Technologies?"],
  ["how do I get started", "How do I start a project?"],
  ["what does a web app cost", "How much does a web or mobile application cost?"],
  ["how much for AI", "How much do AI solutions cost?"],
  ["how long does it take", "How long will my project take?"],
  ["your prices", "What are your prices?"],
];

for (const [q, expected] of variants) {
  const e = answerFromKnowledge(q);
  const ok = e && e.question === expected;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"} | "${q}" -> ${e ? e.question : "NO MATCH"} (expected ${expected})`);
}

console.log("\n=== Unmatched query (should be null) ===");
const noise = answerFromKnowledge("what is the weather in Freetown tomorrow xyzzy");
console.log(`${noise === null ? "PASS" : "FAIL"} | nonsense -> ${noise ? noise.question : "null"}`);
if (noise !== null) failures++;

console.log("\n=== Entry sanity ===");
for (const e of knowledgeEntries) {
  const issues: string[] = [];
  if (!e.answer || e.answer.trim().length < 40) issues.push("answer too short");
  if (!e.keywords.length) issues.push("no keywords");
  if (!e.question) issues.push("no question");
  if (issues.length) {
    failures++;
    console.log(`FAIL | ${e.id}: ${issues.join(", ")}`);
  }
}
console.log(`${knowledgeEntries.length} entries checked`);

console.log(`\n${failures === 0 ? "ALL TESTS PASSED" : failures + " FAILURES"}`);
process.exit(failures === 0 ? 0 : 1);
