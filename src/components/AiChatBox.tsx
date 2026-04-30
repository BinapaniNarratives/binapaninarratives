import { FormEvent, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, User } from "lucide-react";
import "../styles-redlab.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi, I'm Binapani AI. Ask me anything and I'll answer clearly.",
  },
];

const chatEndpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const whatsappContacts = [
  { label: "WhatsApp Business", number: "01400527872", href: "https://wa.me/8801400527872" },
  { label: "WhatsApp", number: "01844736610", href: "https://wa.me/8801844736610" },
];

const MarkdownText = ({ content }: { content: string }) => (
  <div className="space-y-2 whitespace-pre-wrap">
    {content.split(/\n{2,}/).map((block, index) => (
      <p key={index}>{block.replace(/\*\*/g, "")}</p>
    ))}
  </div>
);

export const AiChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const response = await fetch(chatEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publishableKey}`,
        apikey: publishableKey,
      },
      body: JSON.stringify({ messages: nextMessages }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.answer) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data?.error || "Sorry, I could not answer right now. Please try again." },
      ]);
    } else {
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    }

    setIsLoading(false);
  };

  return (
    <section className="ai-chat-panel mx-auto mb-10 w-full max-w-3xl text-left" aria-label="Binapani AI chat box">
      <div className="flex flex-col gap-4 border-b border-border/60 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-4">
          <div className="ai-orb grid size-12 shrink-0 place-items-center rounded-full">
            <Bot className="size-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-foreground">
              Binapani AI <Sparkles className="size-4 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Ask anything</p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {whatsappContacts.map((contact) => (
            <a key={contact.number} href={contact.href} target="_blank" rel="noreferrer" className="whatsapp-chip flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-[0.1em]">
              <span className="whatsapp-icon grid size-8 shrink-0 place-items-center rounded-full">
                <MessageCircle className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-foreground">{contact.label}</span>
                <span className="block text-muted-foreground">{contact.number}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="h-72 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <Bot className="size-4" aria-hidden="true" />
              </div>
            )}
            <div className={`chat-bubble ${message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
              <MarkdownText content={message.content} />
            </div>
            {message.role === "user" && (
              <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <User className="size-4" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" /> Thinking...
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-3 border-t border-border/60 p-3 sm:p-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 1200))}
          className="min-w-0 flex-1 border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          placeholder="Ask about news, Wikipedia topics, editing, anything..."
          aria-label="Ask Binapani AI"
          disabled={isLoading}
        />
        <button type="submit" className="redlab-button grid size-12 shrink-0 place-items-center" aria-label="Send message" disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <Send className="size-5" aria-hidden="true" />}
        </button>
      </form>
    </section>
  );
};

export default AiChatBox;
