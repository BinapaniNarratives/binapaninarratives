import { Volume2 } from "lucide-react";
import { AiAvatar } from "./AiAvatar";

type Msg = { role: "user" | "assistant"; content: string };

const Markdown = ({ content }: { content: string }) => (
  <div className="space-y-2 whitespace-pre-wrap text-sm leading-relaxed">
    {content.split(/\n{2,}/).map((block, i) => {
      // render simple [text](url) links
      const parts = block.split(/(\[[^\]]+\]\([^)]+\))/g);
      return (
        <p key={i}>
          {parts.map((p, j) => {
            const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (m) {
              return (
                <a key={j} href={m[2]} target="_blank" rel="noreferrer" className="underline text-primary hover:opacity-80">
                  {m[1]}
                </a>
              );
            }
            return <span key={j}>{p.replace(/\*\*/g, "").replace(/[*_`>#]/g, "")}</span>;
          })}
        </p>
      );
    })}
  </div>
);

export const ChatMessage = ({
  msg,
  onReplay,
  replayLabel,
  userInitial,
}: {
  msg: Msg;
  onReplay?: () => void;
  replayLabel: string;
  userInitial: string;
}) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-3 fade-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <AiAvatar size={36} />}
      <div className={isUser ? "bubble-user" : "bubble-ai"}>
        <Markdown content={msg.content} />
        {!isUser && onReplay && "speechSynthesis" in window && (
          <button
            type="button"
            onClick={onReplay}
            className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary"
            aria-label={replayLabel}
            title={replayLabel}
          >
            <Volume2 className="size-3" /> {replayLabel}
          </button>
        )}
      </div>
      {isUser && (
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
          {userInitial}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
