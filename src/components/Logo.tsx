import { Link } from "react-router-dom";

export const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-1 group"
    aria-label="RedLabStudio home"
  >
    <span className="font-display font-black italic text-2xl tracking-tight leading-none">
      <span className="text-primary">red</span>
      <span className="text-foreground">lab</span>
      <span className="text-primary">studio</span>
    </span>
  </Link>
);
