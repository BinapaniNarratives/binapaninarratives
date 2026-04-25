import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/site";

const reels = [
  { category: "Storytelling", title: "Paypal Infographic Video | UI Animation Style", duration: "04:20" },
  { category: "Ads / VFX", title: "iPhone Commercial", duration: "00:45" },
  { category: "Geolayers", title: "Map Animation", duration: "01:10" },
  { category: "Retention", title: "Viral Reel", duration: "00:30" },
  { category: "Motion", title: "Kinetic Typography", duration: "00:38" },
  { category: "Cinematic", title: "Travel Showreel", duration: "01:25" },
];

export const PortfolioPreview = () => {
  const items = reels.map((r, i) => ({ ...r, image: projects[i % projects.length].image, id: projects[i % projects.length].id }));

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Showcase  •  Student Portfolio"
          title={<>Proofs of <span className="text-gradient">Mastery</span></>}
          description="ইউটিউব টিউটোরিয়াল দেখে নয়, রিয়েল প্রজেক্ট ব্রিফ ফলো করে আমাদের স্টুডেন্টরা তৈরি করেছে এই অসাধারণ কাজগুলো।"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <Link
              key={p.title}
              to={`/portfolio/${p.id}`}
              className="group relative overflow-hidden rounded-2xl glass aspect-video"
            >
              <img
                src={p.image}
                alt={p.title}
                width={1024}
                height={576}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-14 w-14 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                  <Play size={22} className="text-primary-foreground ml-1" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-[11px] font-medium">
                {p.duration}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-primary-glow font-medium mb-1">{p.category}</p>
                  <h3 className="text-base font-display font-semibold leading-snug">{p.title}</h3>
                </div>
                <div className="h-9 w-9 shrink-0 rounded-full glass flex items-center justify-center group-hover:bg-gradient-primary transition-all">
                  <ArrowUpRight size={14} />
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
