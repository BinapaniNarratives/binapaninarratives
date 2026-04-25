import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../SectionHeader";

const tracks = [
  {
    badge: "Essential",
    title: "The Foundation",
    description:
      "Premiere Pro mastery থেকে শুরু করে Storytelling-এর বেসিক; একদম জিরো থেকে শুরু করার জন্য।",
    cta: "Start This Path",
    highlight: false,
  },
  {
    badge: "Most Popular",
    title: "Advanced Motion",
    description:
      "After Effects-এ অ্যাডভান্সড মোশন গ্রাফিক্স, ৩ডি ট্র্যাকিং এবং সিনেমেটিক ম্যাপ এনিমেশন।",
    cta: "Start This Path",
    highlight: true,
  },
  {
    badge: "Future Tech",
    title: "AI & Production",
    description:
      "AI টুলস ব্যবহার করে প্রোডাকশন স্পিড বাড়ানো এবং প্রফেশনাল কন্টেন্ট তৈরির সিক্রেট মেথড।",
    cta: "Start This Path",
    highlight: false,
  },
];

export const Tracks = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Curriculum Tracks"
          title={<>Choose Your <span className="text-gradient">Mission</span></>}
          description="Three carefully designed paths—pick the one that matches your goal."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {tracks.map((t) => (
            <div
              key={t.title}
              className={`relative glass rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-elegant ${
                t.highlight ? "glow-border ring-1 ring-primary/40" : ""
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-primary text-primary-foreground shadow-glow">
                    {t.badge}
                  </span>
                </div>
              )}
              {!t.highlight && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider glass text-primary-glow mb-4">
                  {t.badge}
                </span>
              )}
              <h3 className="text-2xl font-display font-bold mb-3 mt-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t.description}
              </p>
              <Button asChild variant={t.highlight ? "hero" : "glass"} className="w-full">
                <Link to="/services">
                  {t.cta} <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="glass" size="lg">
            <Link to="/services">View Full Curriculum</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
