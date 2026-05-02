import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Home, MessageSquare, Settings as SettingsIcon, Send, Mic, MicOff, Volume2, VolumeX, Loader2, Sparkles, LogOut, Menu, X } from "lucide-react";
import { LANGUAGES, findLanguage } from "@/lib/languages";
import { UI_STRINGS, formatGreeting, useI18n } from "@/hooks/useI18n";
import { AiAvatar } from "./AiAvatar";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

const chatEndpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const translateEndpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-translate`;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Msg = { role: "user" | "assistant"; content: string };
type Section = "home" | "chat" | "settings";

type Props = {
  name: string;
  languageCode: string;
  onChangeName: () => void;
  onChangeLanguage: (code: string) => void;
};

export const AssistantChat = ({ name, languageCode, onChangeName, onChangeLanguage }: Props) => {
  const language = findLanguage(languageCode);
  const { t, ready } = useI18n(language.name, name);
  const [section, setSection] = useState<Section>("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const greetedRef = useRef<string>("");

  // Speech recognition setup
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

  // TTS
  const speak = (text: string) => {
    if (!voiceOn || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\[(.*?)\]\((.*?)\)/g, "$1").replace(/[*_#`>]/g, "");
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = languageCode;
      const voices = window.speechSynthesis.getVoices();
      const match =
        voices.find((v) => v.lang === languageCode) ||
        voices.find((v) => v.lang.startsWith(languageCode.split("-")[0]));
      if (match) utter.voice = match;
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  // Inject welcome message when translations are ready (re-runs if name/lang changes)
  useEffect(() => {
    if (!ready) return;
    const key = `${languageCode}|${name}`;
    if (greetedRef.current === key) return;
    greetedRef.current = key;
    const greetingText = formatGreeting(t.greeting, t.__name || name);
    setMessages([{ role: "assistant", content: greetingText }]);
    if (autoplay) setTimeout(() => speak(greetingText), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, languageCode, name, t.greeting, t.__name]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const toggleListen = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      try { rec.stop(); } catch {}
      setIsListening(false);
      return;
    }
    rec.lang = languageCode;
    rec.onresult = (e: any) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) transcript += e.results[i][0].transcript;
      setInput(transcript.slice(0, 1200));
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    try { rec.start(); setIsListening(true); } catch { setIsListening(false); }
  };

  const translateOne = async (text: string): Promise<string> => {
    if (/^english/i.test(language.name)) return text;
    try {
      const res = await fetch(translateEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publishableKey}`,
          apikey: publishableKey,
        },
        body: JSON.stringify({ language: language.name, strings: { v: text } }),
      });
      const data = await res.json().catch(() => null);
      const out = data?.translations?.v;
      return typeof out === "string" && out.trim() ? out : text;
    } catch {
      return text;
    }
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    if (isListening) { try { recognitionRef.current?.stop(); } catch {} setIsListening(false); }

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
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
        body: JSON.stringify({ messages: next, language: language.name }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.answer) {
        let errMsg = data?.error || t.errorGeneric;
        if (response.status === 429) errMsg = t.rateLimit;
        if (response.status === 402) errMsg = t.creditsOut;
        // Translate fallback English errors as well
        const localized = await translateOne(errMsg);
        setMessages((c) => [...c, { role: "assistant", content: localized }]);
        if (autoplay) speak(localized);
      } else {
        setMessages((c) => [...c, { role: "assistant", content: data.answer }]);
        if (autoplay) speak(data.answer);
      }
    } catch (err) {
      const localized = await translateOne(UI_STRINGS.errorGeneric);
      setMessages((c) => [...c, { role: "assistant", content: localized }]);
    } finally {
      setIsLoading(false);
    }
  };

  const userInitial = useMemo(() => (t.__name || name).trim().charAt(0).toUpperCase() || "U", [t.__name, name]);

  const newChat = () => {
    greetedRef.current = "";
    setMessages([]);
    // re-trigger greeting via state
    setTimeout(() => {
      const greetingText = formatGreeting(t.greeting, t.__name || name);
      setMessages([{ role: "assistant", content: greetingText }]);
      if (autoplay) speak(greetingText);
      greetedRef.current = `${languageCode}|${name}`;
    }, 50);
  };

  const NavBtn = ({ id, icon: Icon, label }: { id: Section; icon: any; label: string }) => (
    <button
      type="button"
      onClick={() => { setSection(id); setSidebarOpen(false); }}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${
        section === id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="size-4" />
      <span className="truncate">{label}</span>
    </button>
  );

  return (
    <div className="assistant-shell relative flex min-h-screen w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card/95 backdrop-blur transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center gap-3">
            <AiAvatar size={40} />
            <div className="min-w-0">
              <div className="truncate text-sm font-black">{t.appName}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{language.native}</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <NavBtn id="home" icon={Home} label={t.home} />
            <NavBtn id="chat" icon={MessageSquare} label={t.chat} />
            <NavBtn id="settings" icon={SettingsIcon} label={t.settings} />
          </nav>

          <div className="mt-auto rounded-lg border border-border bg-background/60 p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t.signedInAs}</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary text-sm font-bold">
                {userInitial}
              </div>
              <div className="min-w-0 truncate text-sm font-bold">{t.__name || name}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-border md:hidden"
            aria-label="Menu"
          >
            {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <AiAvatar size={36} active={isSpeaking || isLoading} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm font-black">
              {t.appName} <Sparkles className="size-4 text-primary" />
            </div>
            <div className="truncate text-[11px] font-bold text-muted-foreground">
              {t.__name || name} · {language.native}
            </div>
          </div>
          <button
            type="button"
            onClick={() => { if (voiceOn) try { window.speechSynthesis?.cancel?.(); } catch {} setVoiceOn((v) => !v); }}
            className="grid size-9 place-items-center rounded-full border border-border bg-background/80 transition-colors hover:border-primary"
            aria-label={voiceOn ? t.voiceOff : t.voiceOn}
            title={voiceOn ? t.voiceOn : t.voiceOff}
          >
            {voiceOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </header>

        {/* Section content */}
        {section === "home" && (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="glass-card w-full max-w-xl p-8 text-center fade-up">
              <AiAvatar size={84} active className="mx-auto" />
              <h2 className="mt-5 text-2xl font-black">{formatGreeting(t.greeting, t.__name || name).split(/[,.!?]/)[0]}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t.tagline}</p>
              <button
                onClick={() => setSection("chat")}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
              >
                {t.chat} <Send className="size-4" />
              </button>
            </div>
          </div>
        )}

        {section === "settings" && (
          <div className="flex flex-1 justify-center p-6">
            <div className="glass-card w-full max-w-xl p-6 fade-up">
              <h2 className="mb-6 text-lg font-black">{t.settings}</h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.yourName}
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-lg border border-border bg-background/80 px-4 py-2.5 text-sm font-bold">
                      {t.__name || name}
                    </div>
                    <button
                      onClick={onChangeName}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2.5 text-xs font-bold hover:border-primary"
                    >
                      <LogOut className="size-3.5" /> {t.changeName}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="set-lang" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.language}
                  </label>
                  <select
                    id="set-lang"
                    value={languageCode}
                    onChange={(e) => onChangeLanguage(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm font-bold outline-none focus:border-primary"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>{l.native} — {l.name}</option>
                    ))}
                  </select>
                </div>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-background/80 px-4 py-3">
                  <span className="text-sm font-bold">{voiceOn ? t.voiceOn : t.voiceOff}</span>
                  <input type="checkbox" checked={voiceOn} onChange={(e) => setVoiceOn(e.target.checked)} className="size-4 accent-primary" />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-background/80 px-4 py-3">
                  <span className="text-sm font-bold">{t.autoplay}</span>
                  <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} className="size-4 accent-primary" />
                </label>

                <button
                  onClick={() => { newChat(); setSection("chat"); }}
                  className="w-full rounded-lg border border-border px-4 py-3 text-sm font-black uppercase tracking-wider hover:border-primary"
                >
                  {t.newChat}
                </button>
              </div>
            </div>
          </div>
        )}

        {section === "chat" && (
          <>
            <div ref={scrollRef} className="mx-auto w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-4 py-6 md:px-6">
              {messages.map((m, i) => (
                <ChatMessage
                  key={i}
                  msg={m}
                  userInitial={userInitial}
                  replayLabel={t.replay}
                  onReplay={m.role === "assistant" ? () => speak(m.content) : undefined}
                />
              ))}
              {isLoading && <TypingIndicator label={t.typing} />}
              {!ready && (
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" /> {t.loading}
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="mx-auto flex w-full max-w-3xl gap-2 border-t border-border bg-background/70 p-3 backdrop-blur md:p-4">
              {voiceSupported && (
                <button
                  type="button"
                  onClick={toggleListen}
                  disabled={isLoading}
                  className={`grid size-12 shrink-0 place-items-center rounded-full border transition-colors ${
                    isListening
                      ? "border-primary bg-primary text-primary-foreground animate-pulse"
                      : "border-border bg-background/80 hover:border-primary"
                  }`}
                  aria-label={isListening ? t.micStop : t.micStart}
                  title={isListening ? t.micStop : t.micStart}
                >
                  {isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                </button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1200))}
                placeholder={isListening ? t.listening : t.inputPlaceholder}
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-full border border-border bg-background/80 px-5 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                aria-label={t.inputPlaceholder}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={t.send}
                title={t.send}
              >
                {isLoading ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default AssistantChat;
