import { useEffect, useState } from "react";
import { PreChatSetup } from "@/components/assistant/PreChatSetup";
import { AssistantChat } from "@/components/assistant/AssistantChat";

const STORAGE_KEY = "binapani-assistant-session";

type Session = { name: string; languageCode: string };

const Assistant = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name && parsed?.languageCode) setSession(parsed);
      }
    } catch {}
    document.title = "Binapani AI Assistant — multilingual chat & voice";
  }, []);

  const persist = (s: Session | null) => {
    try {
      if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  if (!session) {
    return (
      <PreChatSetup
        onStart={(d) => {
          const s = { name: d.name, languageCode: d.languageCode };
          persist(s);
          setSession(s);
        }}
      />
    );
  }

  return (
    <AssistantChat
      name={session.name}
      languageCode={session.languageCode}
      onChangeName={() => { persist(null); setSession(null); }}
      onChangeLanguage={(code) => {
        const next = { ...session, languageCode: code };
        persist(next);
        setSession(next);
      }}
    />
  );
};

export default Assistant;
