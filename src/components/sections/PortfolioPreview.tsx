import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/site";

export const PortfolioPreview = () => {
  const items = projects.slice(0, 6);
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Selected Work"
          title={<>Projects we're <span className="text-gradient">proud of</span></>}
          description="A glimpse into the brands we've helped build, refresh, and scale."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <Link
              key={p.id}
              to={`/portfolio/${p.id}`}
              className="group relative overflow-hidden rounded-2xl glass aspect-[4/3]"
            >
              <img
                src={p.image}
                alt={p.title}
                width={1024}
                height={768}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                <div>
                  <p className="text-xs text-primary-glow font-medium mb-1">{p.category}</p>
                  <h3 className="text-xl font-display font-semibold">{p.title}</h3>
                </div>
                <div className="h-10 w-10 rounded-full glass flex items-center justify-center group-hover:bg-gradient-primary transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/portfolio">Explore all projects <ArrowUpRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
