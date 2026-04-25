import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden -mt-24 pt-24">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />

      <div className="container relative py-24 md:py-36">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-8 animate-fade-in">
            <Sparkles size={14} className="text-primary-glow" />
            <span>Crafting digital experiences since 2018</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.05] mb-6 animate-fade-in-up">
            Welcome to <br />
            the <span className="text-gradient">Editing!</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "150ms", opacity: 0 }}>
            Creative, fast, and user-focused web solutions for modern businesses.
            We blend strategy, design, and engineering to ship results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "300ms", opacity: 0 }}>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Get Started <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "500ms", opacity: 0 }}>
            {[
              { value: "120+", label: "Projects" },
              { value: "98%", label: "Client retention" },
              { value: "6+", label: "Years crafting" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
