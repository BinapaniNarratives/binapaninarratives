import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl glass p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/40 blur-3xl animate-glow-pulse" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary/40 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-5">
              Let's build your <span className="text-gradient">dream website</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your project. We respond to every inquiry within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Start a project <ArrowRight size={18} /></Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/services">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
