import { Link } from "react-router-dom";

export const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-2 group"
    aria-label="Binapani Narratives home"
    style={{ fontFamily: '"Times New Roman", Times, serif' }}
  >
    <div className="relative">
      <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
        <span
          className="font-bold text-primary-foreground text-lg"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          B
        </span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-lg opacity-50 -z-10 group-hover:opacity-80 transition-opacity" />
    </div>
    <span
      className="font-semibold text-lg tracking-tight"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      Binapani Narratives<span className="text-gradient">.</span>
    </span>
  </Link>
);
