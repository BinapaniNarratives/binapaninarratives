import { AiAvatar } from "./AiAvatar";

export const TypingIndicator = ({ label }: { label: string }) => (
  <div className="flex items-end gap-3 fade-up">
    <AiAvatar size={36} active />
    <div className="bubble-ai flex items-center gap-2">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="ml-2 text-xs font-semibold text-muted-foreground">{label}</span>
    </div>
  </div>
);

export default TypingIndicator;
