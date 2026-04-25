import { ReactNode } from "react";

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}>
    {eyebrow && (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4 text-primary-glow">
        {eyebrow}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    )}
  </div>
);
