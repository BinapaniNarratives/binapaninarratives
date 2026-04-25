import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden -mt-24 pt-24">
      {/* Background — solid black */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Floating orbs removed for pure black background */}
      <div className="container relative py-24 md:py-36">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-8 animate-fade-in">
            <Sparkles size={14} className="text-primary-glow" />
            <span>Batch-1 Enrolling Now</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.05] mb-6 animate-fade-in-up">
            Welcome to <br />
            the <span className="text-gradient">Future!</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "150ms", opacity: 0 }}>
            Master the art of visual storytelling with Bangladesh's great creators.
            Dive deep into aesthetic video editing and motion graphics, guided directly
            by the masterminds behind Voice of Dhaka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "300ms", opacity: 0 }}>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Book Now <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/portfolio">
                <Play size={16} /> Watch Showreel
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "500ms", opacity: 0 }}>
            {[
              { value: "700K+", label: "Subscribers" },
              { value: "3,000+", label: "Students" },
              { value: "6+ YRS", label: "Experience" },
              { value: "AI-DRIVEN", label: "Workflow" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-display font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
