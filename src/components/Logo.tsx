import { Link } from "react-router-dom";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group" aria-label="PixelCraft Studio home">
    <div className="relative">
      <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
        <span className="font-display font-bold text-primary-foreground text-lg">P</span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-lg opacity-50 -z-10 group-hover:opacity-80 transition-opacity" />
    </div>
    <span className="font-display font-semibold text-lg tracking-tight">
      PixelCraft<span className="text-gradient">.</span>
    </span>
  </Link>
);
