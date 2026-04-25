import { Quote } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { testimonials } from "@/data/site";

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Loved by <span className="text-gradient">founders & teams</span></>}
          description="Hear what our clients have to say about working with PixelCraft."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="glass rounded-2xl p-7 relative glow-border transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="text-primary-glow/40 mb-4" size={32} />
              <blockquote className="text-foreground/90 leading-relaxed mb-6">"{t.quote}"</blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
