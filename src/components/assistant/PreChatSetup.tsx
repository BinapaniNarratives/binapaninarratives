import { FormEvent, useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import { AiAvatar } from "./AiAvatar";
import { useI18n } from "@/hooks/useI18n";
import { findLanguage } from "@/lib/languages";

type Props = {
  onStart: (data: { name: string; languageCode: string }) => void;
};

export const PreChatSetup = ({ onStart }: Props) => {
  const [name, setName] = useState("");
  const [langCode, setLangCode] = useState("en-US");

  const langName = findLanguage(langCode).name;
  // translate setup labels live for chosen language
  const { t, ready } = useI18n(langName, name);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onStart({ name: trimmed, languageCode: langCode });
  };

  return (
    <div className="assistant-shell min-h-screen w-full grid place-items-center px-4 py-10">
      <div className="glass-card w-full max-w-lg p-8 fade-up">
        <div className="flex flex-col items-center text-center">
          <AiAvatar size={72} active />
          <h1 className="mt-5 flex items-center gap-2 text-2xl font-black tracking-tight text-foreground">
            {t.appName} <Sparkles className="size-5 text-primary" />
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="pc-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t.welcomeNamePrompt}
            </label>
            <input
              id="pc-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 60))}
              placeholder={t.namePlaceholder}
              className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="pc-lang" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t.languagePrompt}
            </label>
            <select
              id="pc-lang"
              value={langCode}
              onChange={(e) => setLangCode(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} — {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !ready}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!ready ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {t.preparing}
              </>
            ) : (
              <>
                {t.startChat} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t.poweredBy}</p>
        </form>
      </div>
    </div>
  );
};

export default PreChatSetup;
