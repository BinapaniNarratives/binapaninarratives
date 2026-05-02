import { Bot } from "lucide-react";

type Props = {
  size?: number;
  active?: boolean;
  className?: string;
};

export const AiAvatar = ({ size = 56, active = false, className = "" }: Props) => (
  <div
    className={`avatar-orb ${active ? "is-active" : ""} grid place-items-center rounded-full text-primary-foreground ${className}`}
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <Bot style={{ width: size * 0.55, height: size * 0.55 }} />
  </div>
);

export default AiAvatar;
