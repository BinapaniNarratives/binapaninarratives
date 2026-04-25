import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { team } from "@/data/site";
import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  const values = [
    { icon: Target, title: "Our Mission", text: "Empower ambitious brands with websites that turn ideas into measurable growth." },
    { icon: Eye, title: "Our Vision", text: "A web where every business — big or small — has access to world-class craft." },
    { icon: Heart, title: "Our Values", text: "Curiosity, candor, and craftsmanship. We sweat the details so you don't have to." },
  ];

  return (
    <Layout>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 -z-10" />
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4 text-primary-glow">About us</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
              We're a small studio with <span className="text-gradient">big ambitions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PixelCraft Studio is a tight-knit team of designers and engineers based in San Francisco.
              Since 2018 we've partnered with startups and established brands to ship websites that perform —
              creatively, technically, and commercially.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="glass rounded-2xl p-7 glow-border">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-glow">
                  <v.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeader
            eyebrow="The team"
            title={<>Meet the <span className="text-gradient">people behind</span> the pixels</>}
            description="A multidisciplinary team united by craft and curiosity."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="group glass rounded-2xl overflow-hidden glow-border transition-transform hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold">{m.name}</h3>
                  <p className="text-xs text-primary-glow mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </Layout>
  );
};

export default About;
