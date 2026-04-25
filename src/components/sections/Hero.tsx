import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden -mt-24 pt-32 md:pt-40">
      {/* Solid black background with subtle red radial vignette + grid */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, hsl(var(--primary) / 0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="container relative pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-xs font-bold tracking-wider uppercase text-primary mb-10 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Batch-1 Enrolling Now
          </div>

          {/* Headline — massive italic uppercase, last word red */}
          <h1 className="font-display font-black italic uppercase tracking-tight leading-[0.95] mb-8 animate-fade-in-up">
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
              Welcome to
            </span>
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl mt-2">
              the
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl mt-2 text-primary"
              style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
            >
              Future!
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "150ms", opacity: 0 }}
          >
            Master the art of visual storytelling with Bangladesh's great creators.
            Dive deep into aesthetic video editing and motion graphics, guided directly
            by the masterminds behind Voice of Dhaka.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "300ms", opacity: 0 }}
          >
            <Button asChild variant="hero" size="lg" className="font-bold uppercase tracking-wider">
              <Link to="/contact">
                Book Now <ArrowRight size={18} />
              </Link>
            </Button>

            {/* Showreel — circular play + label */}
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-all group-hover:border-primary group-hover:shadow-glow">
                <Play size={16} className="text-foreground ml-0.5 fill-current" />
              </span>
              Watch Showreel
            </Link>
          </div>

          {/* Stats row with vertical dividers */}
          <div
            className="mt-20 flex flex-wrap items-center justify-center gap-y-6 animate-fade-in-up"
            style={{ animationDelay: "500ms", opacity: 0 }}
          >
            {[
              { value: "700K+", label: "Subscribers" },
              { value: "3,000+", label: "Students" },
              { value: "6+ YRS", label: "Experience" },
              { value: "AI-DRIVEN", label: "Workflow" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-6 md:px-10 text-center ${
                  i !== 0 ? "border-l border-border/60" : ""
                }`}
              >
                <div className="text-2xl md:text-3xl font-display font-extrabold text-foreground">
                  {s.value}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
