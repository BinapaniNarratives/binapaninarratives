import { ArrowUpRight, Sparkles, Video } from "lucide-react";
import WatchButtons from "@/components/WatchButtons";
import ThemeToggle from "@/components/ThemeToggle";
import AiChatBox from "@/components/AiChatBox";
import binapaniLogo from "@/assets/binapani-logo.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import "../styles-bn.css";

const works = [
  { tag: "Documentary", title: "Voices of the River", year: "2025" },
  { tag: "Short Film", title: "After the Monsoon", year: "2024" },
  { tag: "Portrait Series", title: "Faces of Bengal", year: "2024" },
  { tag: "Visual Essay", title: "Streets at Dawn", year: "2023" },
];

const services = [
  "Visual Storytelling",
  "Documentary Direction",
  "Editorial Photography",
  "Brand Narratives",
  "Creative Consulting",
];

const marquee = ["Stories", "•", "Cinema", "•", "Portraits", "•", "Essays", "•", "Bengal", "•"];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="bn-shell flex-1 min-h-screen overflow-hidden text-foreground">
          <header className="glass-nav sticky top-0 z-30">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <a href="#home" className="flex items-center leading-none" aria-label="Binapani Narratives home">
                  <img src={binapaniLogo} alt="Binapani Narratives logo" className="h-10 sm:h-12 w-auto object-contain" />
                </a>
              </div>
              <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">
                <a href="#work" className="hover:text-foreground transition">Work</a>
                <a href="#about" className="hover:text-foreground transition">About</a>
                <a href="#services" className="hover:text-foreground transition">Services</a>
                <a href="#contact" className="hover:text-foreground transition">Contact</a>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <a href="#contact" className="hidden sm:inline-flex bn-button items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em]">
                  Let's Talk <ArrowUpRight size={14} />
                </a>
              </div>
            </nav>
          </header>

          {/* HERO */}
          <section id="home" className="relative px-5 sm:px-8 pt-20 pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="bn-pill mb-10 inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.24em]">
                <Sparkles className="sparkle-rainbow h-4 w-4" />
                Independent Visual Studio · Est. 2023
              </div>

              <h1 className="bn-display-type text-[15vw] sm:text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight">
                <span className="block hero-word">Stories that</span>
                <span className="block hero-word text-primary">breathe.</span>
              </h1>

              <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
                <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Binapani Narratives is a portfolio of cinematic documentary, portrait,
                  and editorial work by Pritom Modak — capturing the quiet rhythms of
                  people, place, and memory.
                </p>
                <div className="flex flex-col items-start gap-5 md:items-end">
                  <WatchButtons />
                  <div className="bn-stat bn-stat-blur flex items-center justify-center px-8 py-4 rounded-xl">
                    <span className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em]">
                      Experience 2 Yrs
                      <Video className="experience-icon h-4 w-4 text-primary" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="overflow-hidden border-y border-border/50 bg-card/40 py-6">
            <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap gap-10 text-4xl sm:text-6xl font-black italic uppercase tracking-tight">
              {[...marquee, ...marquee, ...marquee].map((w, i) => (
                <span key={i} className={i % 2 === 0 ? "text-foreground" : "text-primary"}>{w}</span>
              ))}
            </div>
          </div>

          {/* WORK */}
          <section id="work" className="px-5 sm:px-8 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="bn-kicker mb-3">Selected Work</p>
                  <h2 className="bn-display-type text-5xl sm:text-7xl leading-none">Frames &amp; Stories</h2>
                </div>
                <a href="#" className="hidden sm:inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition">
                  View archive <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {works.map((w, i) => (
                  <a key={w.title} href="#" className="group block">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card relative">
                      <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${
                        i % 4 === 0 ? "bg-gradient-to-br from-primary/40 via-card to-background" :
                        i % 4 === 1 ? "bg-gradient-to-tr from-orange-500/30 via-card to-background" :
                        i % 4 === 2 ? "bg-gradient-to-bl from-amber-400/30 via-card to-background" :
                        "bg-gradient-to-tl from-rose-500/30 via-card to-background"
                      }`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bn-display-type text-7xl text-foreground/10">0{i + 1}</span>
                      </div>
                      <div className="absolute top-4 left-4 bn-pill rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em]">
                        {w.tag}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-primary transition">
                        {w.title}
                      </h3>
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">{w.year}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="bn-section-band px-5 sm:px-8 py-24">
            <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="bn-kicker mb-3">The Philosophy</p>
                <h2 className="bn-display-type text-5xl sm:text-7xl leading-none mb-6">
                  Slow looking. <span className="text-primary">Honest frames.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  Every project begins with listening. We spend time with our subjects
                  before lifting a camera — letting the story shape its own form,
                  pace, and palette. The result is work that feels lived-in rather
                  than performed.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { k: "30+", v: "Projects" },
                  { k: "12", v: "Festivals" },
                  { k: "4", v: "Editorial Features" },
                  { k: "2 yrs", v: "On the road" },
                ].map((s) => (
                  <div key={s.v} className="bn-stat-blur rounded-2xl p-6">
                    <div className="bn-display-type text-4xl sm:text-5xl text-foreground">{s.k}</div>
                    <div className="mt-2 text-[0.7rem] font-black uppercase tracking-[0.24em] text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="px-5 sm:px-8 py-24">
            <div className="mx-auto max-w-7xl">
              <p className="bn-kicker mb-3">What We Do</p>
              <h2 className="bn-display-type text-5xl sm:text-7xl leading-none mb-12">Services</h2>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {services.map((s, i) => (
                  <li key={s} className="group flex items-center justify-between py-6 sm:py-8 cursor-pointer">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground w-8">0{i + 1}</span>
                      <span className="bn-display-type text-3xl sm:text-5xl group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                        {s}
                      </span>
                    </div>
                    <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CONTACT CTA */}
          <section id="contact" className="px-5 sm:px-8 py-32 relative">
            <div className="mx-auto max-w-5xl text-center">
              <p className="bn-kicker mb-4">Start a Project</p>
              <h2 className="bn-display-type text-6xl sm:text-8xl md:text-9xl leading-[0.85] mb-10">
                Let's make <span className="text-primary">something</span> real.
              </h2>
              <a
                href="mailto:hello@binapaninarratives.com"
                className="bn-button inline-flex items-center gap-3 rounded-full px-9 py-5 text-sm font-black uppercase tracking-[0.2em]"
              >
                hello@binapaninarratives.com
                <ArrowUpRight size={18} />
              </a>
            </div>
          </section>

          {/* AI CHAT */}
          <section className="px-5 pb-20 sm:px-6">
            <AiChatBox />
          </section>

          <footer className="border-t border-border/60 px-5 sm:px-8 py-10">
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">
              <div>© {new Date().getFullYear()} Binapani Narratives</div>
              <div>Pritom Modak · Independent Studio</div>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
