import { Link } from "react-router-dom";

export const Logo = () => (
  <Link
    to="/"
    className="flex flex-col items-start leading-none group"
    aria-label="RedLabStudio home"
  >
    <span className="font-display font-black italic text-2xl tracking-tight leading-none">
      <span className="text-primary">red</span>
      <span className="text-foreground">lab</span>
      <span className="text-primary">studio</span>
    </span>
    <span className="text-[8px] font-bold tracking-[0.2em] text-muted-foreground mt-1 uppercase">
      Powered by <span className="text-foreground">Voice of Dhaka</span>
    </span>
  </Link>
);
