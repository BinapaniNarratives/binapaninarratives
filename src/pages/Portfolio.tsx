import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CtaSection } from "@/components/sections/CtaSection";
import { projects, type Category } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const filters: ("All" | Category)[] = ["All", "Business", "E-commerce", "Portfolio"];

const Portfolio = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 -z-10" />
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4 text-primary-glow">Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
              A selection of <span className="text-gradient">recent work</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse projects across business sites, e-commerce, and creative portfolios.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  active === f
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "glass text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.id}`}
                className="group relative overflow-hidden rounded-2xl glass aspect-[4/3] animate-fade-in"
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
        </div>
      </section>

      <CtaSection />
    </Layout>
  );
};

export default Portfolio;
