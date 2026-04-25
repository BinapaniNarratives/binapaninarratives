import { Code2, Palette, Layers, ShoppingBag, Search, Smartphone } from "lucide-react";
import { SectionHeader } from "../SectionHeader";

export const services = [
  { icon: Palette, title: "Web Design", description: "Beautiful, brand-aligned interfaces that turn first impressions into lasting trust." },
  { icon: Code2, title: "Web Development", description: "Performant, scalable websites built with modern stacks and clean architecture." },
  { icon: Layers, title: "UI/UX Design", description: "Research-driven flows and pixel-perfect interfaces your customers will love." },
  { icon: ShoppingBag, title: "E-commerce Solutions", description: "High-converting online stores with seamless checkout and inventory tools." },
  { icon: Search, title: "SEO Optimization", description: "Technical SEO and content strategy that compounds organic growth over time." },
  { icon: Smartphone, title: "Mobile-first Builds", description: "Responsive experiences engineered to feel native on every screen size." },
];

export const Services = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title={<>Everything you need to <span className="text-gradient">launch & grow</span></>}
          description="A full-stack agency offering strategy, design, and engineering under one roof."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative glass rounded-2xl p-7 glow-border transition-all hover:-translate-y-1 hover:shadow-elegant"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary mb-5 shadow-glow">
                <s.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
