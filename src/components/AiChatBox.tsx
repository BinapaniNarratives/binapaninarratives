import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Mic, MicOff, Send, Sparkles, User, Volume2, VolumeX } from "lucide-react";
import "../styles-redlab.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi, I'm Binapani AI. Ask me anything by typing or tap the mic to talk in your language.",
  },
];

const chatEndpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const whatsappContacts = [
  { label: "WhatsApp Business", number: "01400527872", href: "https://wa.me/8801400527872" },
  { label: "WhatsApp", number: "01844736610", href: "https://wa.me/8801844736610" },
];

// Comprehensive language list (BCP-47 codes) covering all major world languages
const languages: { code: string; name: string }[] = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "bn-BD", name: "Bangla (Bangladesh)" },
  { code: "bn-IN", name: "Bangla (India)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ur-PK", name: "Urdu" },
  { code: "ar-SA", name: "Arabic" },
  { code: "fa-IR", name: "Persian" },
  { code: "tr-TR", name: "Turkish" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "pt-PT", name: "Portuguese (Portugal)" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "nl-NL", name: "Dutch" },
  { code: "sv-SE", name: "Swedish" },
  { code: "no-NO", name: "Norwegian" },
  { code: "da-DK", name: "Danish" },
  { code: "fi-FI", name: "Finnish" },
  { code: "pl-PL", name: "Polish" },
  { code: "cs-CZ", name: "Czech" },
  { code: "sk-SK", name: "Slovak" },
  { code: "hu-HU", name: "Hungarian" },
  { code: "ro-RO", name: "Romanian" },
  { code: "bg-BG", name: "Bulgarian" },
  { code: "el-GR", name: "Greek" },
  { code: "uk-UA", name: "Ukrainian" },
  { code: "ru-RU", name: "Russian" },
  { code: "he-IL", name: "Hebrew" },
  { code: "zh-CN", name: "Chinese (Mandarin)" },
  { code: "zh-TW", name: "Chinese (Taiwan)" },
  { code: "zh-HK", name: "Chinese (Cantonese)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "vi-VN", name: "Vietnamese" },
  { code: "th-TH", name: "Thai" },
  { code: "id-ID", name: "Indonesian" },
  { code: "ms-MY", name: "Malay" },
  { code: "fil-PH", name: "Filipino" },
  { code: "ta-IN", name: "Tamil" },
  { code: "te-IN", name: "Telugu" },
  { code: "ml-IN", name: "Malayalam" },
  { code: "kn-IN", name: "Kannada" },
  { code: "mr-IN", name: "Marathi" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "pa-IN", name: "Punjabi" },
  { code: "ne-NP", name: "Nepali" },
  { code: "si-LK", name: "Sinhala" },
  { code: "my-MM", name: "Burmese" },
  { code: "km-KH", name: "Khmer" },
  { code: "lo-LA", name: "Lao" },
  { code: "sw-KE", name: "Swahili" },
  { code: "am-ET", name: "Amharic" },
  { code: "zu-ZA", name: "Zulu" },
  { code: "af-ZA", name: "Afrikaans" },
  { code: "ha-NG", name: "Hausa" },
  { code: "yo-NG", name: "Yoruba" },
  { code: "ig-NG", name: "Igbo" },
  { code: "ca-ES", name: "Catalan" },
  { code: "eu-ES", name: "Basque" },
  { code: "gl-ES", name: "Galician" },
  { code: "is-IS", name: "Icelandic" },
  { code: "ga-IE", name: "Irish" },
  { code: "cy-GB", name: "Welsh" },
  { code: "hr-HR", name: "Croatian" },
  { code: "sr-RS", name: "Serbian" },
  { code: "sl-SI", name: "Slovenian" },
  { code: "lt-LT", name: "Lithuanian" },
  { code: "lv-LV", name: "Latvian" },
  { code: "et-EE", name: "Estonian" },
  { code: "ka-GE", name: "Georgian" },
  { code: "hy-AM", name: "Armenian" },
  { code: "az-AZ", name: "Azerbaijani" },
  { code: "kk-KZ", name: "Kazakh" },
  { code: "uz-UZ", name: "Uzbek" },
  { code: "mn-MN", name: "Mongolian" },
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
  const [lang, setLang] = useState<string>("en-US");
  const [isListening, setIsListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      setVoiceSupported(true);
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      recognitionRef.current = rec;
    }
    return () => {
      try { recognitionRef.current?.abort?.(); } catch {}
      try { window.speechSynthesis?.cancel?.(); } catch {}
    };
  }, []);

  const speak = (text: string) => {
    if (!voiceOn || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text.replace(/\[(.*?)\]\((.*?)\)/g, "$1").replace(/[*_#`>]/g, ""));
      utter.lang = lang;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang === lang) || voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
      if (match) utter.voice = match;
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  const toggleListen = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      try { rec.stop(); } catch {}
      setIsListening(false);
      return;
    }
    rec.lang = lang;
    rec.onresult = (e: any) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript.slice(0, 1200));
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    try {
      rec.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    if (isListening) {
      try { recognitionRef.current?.stop?.(); } catch {}
      setIsListening(false);
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const langName = languages.find((l) => l.code === lang)?.name || "English";

    const response = await fetch(chatEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publishableKey}`,
        apikey: publishableKey,
      },
      body: JSON.stringify({ messages: nextMessages, language: langName }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.answer) {
      const errMsg = data?.error || "Sorry, I could not answer right now. Please try again.";
      setMessages((current) => [...current, { role: "assistant", content: errMsg }]);
      speak(errMsg);
    } else {
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
      speak(data.answer);
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
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-foreground">
              Binapani AI <Sparkles className="size-4 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Ask anything · Voice ready</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (voiceOn) { try { window.speechSynthesis?.cancel?.(); } catch {} }
              setVoiceOn((v) => !v);
            }}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:border-primary"
            aria-label={voiceOn ? "Mute voice" : "Unmute voice"}
            title={voiceOn ? "Voice on" : "Voice off"}
          >
            {voiceOn ? <Volume2 className="size-4" aria-hidden="true" /> : <VolumeX className="size-4" aria-hidden="true" />}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="ai-lang">
            Language
          </label>
          <select
            id="ai-lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="min-w-0 flex-1 border border-border bg-background/80 px-3 py-2 text-xs font-bold text-foreground outline-none transition-colors focus:border-primary"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
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
              {message.role === "assistant" && "speechSynthesis" in window && (
                <button
                  type="button"
                  onClick={() => speak(message.content)}
                  className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary"
                  aria-label="Replay voice"
                  title="Replay voice in selected language"
                >
                  <Volume2 className="size-3" aria-hidden="true" /> Play
                </button>
              )}
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

      <form onSubmit={sendMessage} className="flex gap-2 border-t border-border/60 p-3 sm:gap-3 sm:p-4">
        {voiceSupported && (
          <button
            type="button"
            onClick={toggleListen}
            className={`grid size-12 shrink-0 place-items-center rounded-full border transition-colors ${isListening ? "border-primary bg-primary text-primary-foreground animate-pulse" : "border-border bg-background/80 text-foreground hover:border-primary"}`}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            title={isListening ? "Listening..." : "Tap to speak"}
            disabled={isLoading}
          >
            {isListening ? <MicOff className="size-5" aria-hidden="true" /> : <Mic className="size-5" aria-hidden="true" />}
          </button>
        )}
        <input
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 1200))}
          className="min-w-0 flex-1 border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          placeholder={isListening ? "Listening..." : "Ask anything or tap the mic..."}
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
