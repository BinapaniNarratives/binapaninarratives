import { useEffect, useRef, useState } from "react";

const translateEndpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-translate`;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Base English UI strings — single source of truth
export const UI_STRINGS = {
  appName: "Binapani AI Assistant",
  tagline: "Speak any language. Get answered in yours.",
  welcomeTitle: "Welcome",
  welcomeNamePrompt: "What is your name?",
  namePlaceholder: "Enter your name",
  languagePrompt: "Choose your preferred language",
  startChat: "Start Chat",
  greeting: "Hello {name}, I'm Binapani AI. Ask me anything — I will reply only in your selected language.",
  send: "Send",
  inputPlaceholder: "Type your message...",
  listening: "Listening...",
  typing: "AI is typing...",
  loading: "Loading...",
  voiceOn: "Voice on",
  voiceOff: "Voice off",
  autoplay: "Auto-play voice",
  replay: "Replay voice",
  micStart: "Tap to speak",
  micStop: "Stop listening",
  home: "Home",
  chat: "Chat",
  settings: "Settings",
  yourName: "Your name",
  language: "Language",
  changeName: "Change name",
  newChat: "New chat",
  signedInAs: "Signed in as",
  errorGeneric: "Sorry, I could not answer. Please try again.",
  rateLimit: "Too many requests. Please wait a moment.",
  creditsOut: "AI credits exhausted. Please add credits.",
  preparing: "Preparing your assistant...",
  poweredBy: "Powered by Lovable AI",
} as const;

export type UIKey = keyof typeof UI_STRINGS;

// Module-level cache (persists across mounts within session)
const cache = new Map<string, Record<string, string>>();

const cacheKey = (lang: string, name: string) => `${lang}|${name}`;

export function useI18n(languageName: string, userName: string) {
  const [t, setT] = useState<Record<UIKey, string> & { __name: string }>(() => {
    const cached = cache.get(cacheKey(languageName, userName));
    if (cached) return cached as any;
    return { ...UI_STRINGS, __name: userName } as any;
  });
  const [ready, setReady] = useState<boolean>(() => {
    if (/^english/i.test(languageName)) return true;
    return cache.has(cacheKey(languageName, userName));
  });
  const reqRef = useRef(0);

  useEffect(() => {
    const key = cacheKey(languageName, userName);
    const cached = cache.get(key);
    if (cached) {
      setT(cached as any);
      setReady(true);
      return;
    }
    if (/^english/i.test(languageName)) {
      const obj = { ...UI_STRINGS, __name: userName } as any;
      cache.set(key, obj);
      setT(obj);
      setReady(true);
      return;
    }
    const reqId = ++reqRef.current;
    setReady(false);
    (async () => {
      try {
        const res = await fetch(translateEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publishableKey}`,
            apikey: publishableKey,
          },
          body: JSON.stringify({ language: languageName, strings: UI_STRINGS, name: userName || undefined }),
        });
        const data = await res.json().catch(() => null);
        if (reqId !== reqRef.current) return;
        const translations = data?.translations;
        if (translations && typeof translations === "object") {
          const merged = { ...UI_STRINGS, ...translations, __name: translations.__name || userName } as any;
          cache.set(key, merged);
          setT(merged);
        }
      } catch (e) {
        console.error("i18n fetch failed", e);
      } finally {
        if (reqId === reqRef.current) setReady(true);
      }
    })();
  }, [languageName, userName]);

  return { t, ready };
}

export function formatGreeting(template: string, name: string) {
  return template.replace(/\{name\}/g, name);
}
