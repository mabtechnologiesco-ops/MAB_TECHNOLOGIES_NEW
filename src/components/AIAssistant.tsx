import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Send, X, Sparkles, RefreshCw, AlertCircle, MessageCircle, ChevronDown } from "lucide-react";
import { aiChatEndpoint, isSupabaseConfigured } from "@/lib/supabase";
import { company } from "@/data/company";
import { usePrefill } from "@/lib/prefill";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How much does a website cost?",
  "Can you build an e-commerce website?",
  "Can you build a mobile app?",
  "What AI agents do you offer?",
  "How can I automate my business?",
  "Can I see your portfolio?",
  "How can I contact you?",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm the MAB Technologies assistant. I can help with our services, pricing, portfolio, or starting a project. How can I help?",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offline, setOffline] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { requestEnquiry } = usePrefill();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(false);
    setShowSuggested(false);

    try {
      let replyText: string;
      let isOffline = false;

      if (aiChatEndpoint && isSupabaseConfigured) {
        const res = await fetch(aiChatEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ messages: next.slice(-12) }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        replyText = data.reply || "Sorry, I didn't get a response. Please try again.";
        isOffline = Boolean(data.offline);
      } else {
        // No backend configured — fall back to WhatsApp guidance
        replyText =
          "I'm not connected to the AI service yet. Please reach us on WhatsApp at +232 70 451 369 or use the contact form below — we'll respond quickly.";
        isOffline = true;
      }

      setOffline(isOffline);
      setMessages((m) => [...m, { role: "assistant", content: replyText }]);
    } catch (err) {
      setError(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble responding right now. You can reach us on WhatsApp at +232 70 451 369 or via the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setMessages((m) => m.slice(0, m.length - 1)); // remove last assistant error msg
    setError(false);
    send(lastUser.content);
  };

  const startEnquiry = () => {
    setOpen(false);
    requestEnquiry({ description: "I'd like to start a project. " });
  };

  return (
    <>
      {/* Launcher - bottom LEFT */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        aria-expanded={open}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] px-4 py-3.5 text-white shadow-xl shadow-[#078BFF]/30 transition-transform hover:scale-105 active:scale-95 animate-pulse-glow"
      >
        {open ? <X size={20} /> : <Bot size={20} />}
        <span className="hidden text-sm font-semibold sm:inline">
          {open ? "Close" : "Ask AI"}
        </span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 left-5 z-40 flex h-[560px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-[#073D78]/20 bg-white shadow-2xl animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-gradient px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF]">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#061A38] bg-[#28c840]" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-bold">MAB Assistant</div>
                <div className="text-[10px] text-white/60">
                  {offline ? "Limited mode" : "Online · usually replies instantly"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-[#F5F8FC] px-3.5 py-4"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}

            {loading && (
              <div className="flex items-center gap-1.5 pl-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#078BFF] [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#078BFF] [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#078BFF]" />
              </div>
            )}

            {error && !loading && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                <AlertCircle size={14} />
                <span className="flex-1">Couldn't reach the assistant.</span>
                <button
                  onClick={retry}
                  className="inline-flex items-center gap-1 font-semibold hover:underline"
                >
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}
          </div>

          {/* Suggested questions */}
          {showSuggested && messages.length <= 1 && (
            <div className="border-t border-[#073D78]/10 bg-white px-3.5 py-3">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#061A38]/60">
                <Sparkles size={12} className="text-[#078BFF]" />
                Suggested questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-[#078BFF]/30 bg-[#078BFF]/5 px-3 py-1.5 text-[11px] font-medium text-[#073D78] transition-colors hover:bg-[#078BFF]/15"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="flex items-center gap-2 border-t border-[#073D78]/10 bg-white px-3.5 py-2">
            <button
              onClick={startEnquiry}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#061A38] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#073D78]"
            >
              <MessageCircle size={12} />
              Start a project
            </button>
            <a
              href={company.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-[11px] font-semibold text-white hover:opacity-90"
            >
              WhatsApp
            </a>
            <button
              onClick={() => {
                setMessages([WELCOME]);
                setShowSuggested(true);
                setError(false);
                setOffline(false);
              }}
              className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[#061A38]/50 hover:text-[#078BFF]"
            >
              <ChevronDown size={12} /> Reset
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#073D78]/10 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-[#073D78]/15 bg-[#F5F8FC] px-4 py-2.5 text-sm text-[#061A38] outline-none focus:border-[#078BFF] focus:ring-2 focus:ring-[#078BFF]/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-r from-[#078BFF] to-[#31C8FF] text-white"
            : "rounded-bl-sm border border-[#073D78]/10 bg-white text-[#061A38]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
