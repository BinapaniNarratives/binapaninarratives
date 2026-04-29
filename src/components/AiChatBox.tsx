import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
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

const MarkdownText = ({ content }: { content: string }) => (
  <div>
    {content.split(/\n{2,}/).map((block, index) => (
      <p key={index}>{block.replace(/\*\*/g, "")}</p>
    ))}
  </div>
);

export const AiChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
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
          {
            role: "assistant",
            content: data?.error || "Sorry, I could not answer right now. Please try again.",
          },
        ]);
      } else {
        setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
      }
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="ai-chat-panel mx-auto w-full max-w-3xl rounded-3xl p-5 sm:p-7">
      <header className="flex items-center gap-3 border-b border-border/60 pb-4">
        <span className="ai-orb flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-black uppercase tracking-[0.18em] text-foreground">Binapani AI</h2>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-muted-foreground">
            Ask anything
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="mt-5 flex max-h-[55vh] flex-col gap-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <span className="ai-orb mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <Bot className="h-4 w-4" />
              </span>
            )}
            <div
              className={`chat-bubble rounded-2xl ${
                message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              }`}
            >
              <MarkdownText content={message.content} />
            </div>
            {message.role === "user" && (
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                <User className="h-4 w-4" />
              </span>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-5 flex items-center gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 1200))}
          className="min-w-0 flex-1 rounded-full border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          placeholder="Ask me anything..."
          aria-label="Ask Binapani AI"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="ai-orb flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-50"
          aria-label="Send"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </section>
  );
};

export default AiChatBox;
