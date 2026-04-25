import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { Services, services } from "@/components/sections/Services";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Basic",
    price: "$2,490",
    description: "For founders launching a polished landing page.",
    features: ["Up to 5 pages", "Custom design system", "Mobile-responsive", "Basic SEO setup", "2 weeks delivery"],
    featured: false,
  },
  {
    name: "Standard",
    price: "$5,990",
    description: "For growing teams that need a full marketing site.",
    features: ["Up to 12 pages", "Bespoke UI/UX", "CMS integration", "Advanced SEO + analytics", "Performance optimization", "4 weeks delivery"],
    featured: true,
  },
  {
    name: "Premium",
    price: "Custom",
    description: "Full e-commerce, web apps, and ongoing partnership.",
    features: ["Unlimited pages", "Custom integrations", "E-commerce / Web app", "Dedicated team", "Ongoing optimization", "Quarterly strategy"],
    featured: false,
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 -z-10" />
        <div className="container text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4 text-primary-glow">Services</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Crafted services for <span className="text-gradient">every stage</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a single landing page to a multi-region e-commerce platform, we tailor our process to fit your goals and timeline.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-8 glow-border flex gap-5">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <s.icon size={22} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeader
            eyebrow="Pricing"
            title={<>Transparent <span className="text-gradient">packages</span></>}
            description="Predictable pricing with no hidden fees. Custom scopes available."
          />
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-2xl p-8 transition-transform hover:-translate-y-1 ${
                  t.featured
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "glass glow-border"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background text-xs font-semibold text-foreground">
                    Most popular
                  </div>
                )}
                <h3 className="text-2xl font-display font-bold">{t.name}</h3>
                <p className={`text-sm mt-1 mb-5 ${t.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {t.description}
                </p>
                <div className="text-4xl font-display font-bold mb-6">
                  {t.price}
                  {t.price !== "Custom" && (
                    <span className={`text-sm font-normal ml-1 ${t.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      / project
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={t.featured ? "text-primary-foreground" : "text-primary-glow"} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={t.featured ? "glass" : "hero"}
                  className="w-full"
                >
                  <Link to="/contact">Get started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </Layout>
  );
};

export default ServicesPage;
