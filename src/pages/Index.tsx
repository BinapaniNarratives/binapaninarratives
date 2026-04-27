import { ArrowRight, Sparkles, Video } from "lucide-react";
import WatchButtons from "@/components/WatchButtons";
import ThemeToggle from "@/components/ThemeToggle";
import "../styles-bn.css";

const Index = () => {
  return (
    <main className="bn-shell min-h-screen overflow-hidden text-foreground">
      <header className="glass-nav fixed left-0 right-0 top-0 z-30">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="#home" className="leading-none" aria-label="Binapani Narratives home">
            <div className="bn-kicker text-base">
              <span>Binapani </span>
              <span>Narratives</span>
            </div>
            <div className="mt-1 text-[0.42rem] font-black uppercase tracking-[0.38em] text-muted-foreground">
              <span className="powered-blur">powered by </span>
              <span className="text-primary">pritom</span>
              <span className="text-foreground"> modak</span>
            </div>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {["Home", "Courses", "Success", "Course Details"].map((item, index) => (
              <a
                key={item}
                href={`#${index === 0 ? "home" : index === 1 ? "courses" : index === 2 ? "success" : "details"}`}
                className={`nav-link text-xs font-black uppercase tracking-[0.2em] ${
                  index === 0 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section id="home" className="relative flex min-h-screen items-center justify-center px-5 pb-14 pt-28 text-center">
        <div className="mx-auto max-w-6xl animate-fade-in">
          <div className="bn-pill mx-auto mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.24em]">
            <span className="relative inline-flex">
              <Sparkles className="sparkle-rainbow h-4 w-4" />
            </span>
            Subscribe Now
          </div>

          <p className="bn-kicker hero-bio mx-auto mt-9 max-w-5xl text-sm leading-7 md:text-base md:leading-8">
            A professional video editor and the CEO of the documentary YouTube channel Binapani Narratives. With over two years of hands-on experience in video editing and digital marketing, strong dedication, creativity, imagination, and professional skills have helped establish a solid presence in the digital content industry. A student of Rowshan Taieen, CEO of Bangladesh's leading documentary YouTube channel Voice of Dhaka, and also a student of Mexemy, gaining advanced editing expertise, a strong professional mindset, and in-depth knowledge of digital marketing and documentary storytelling under their guidance. With more than two years of experience, modern editing techniques, creative storytelling, and strategic digital promotion are applied to produce impactful documentary content.
          </p>

          <div className="mt-12 flex justify-center">
            <WatchButtons />
          </div>

          <div className="mx-auto mt-16 flex max-w-3xl justify-center">
            <div className="bn-stat bn-stat-blur flex items-center justify-center px-10">
              <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.28em] text-foreground">
                Experience 2 Yrs
                <Video className="experience-icon h-5 w-5 text-primary" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="bn-section-band px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="bn-kicker">The Binapani Narratives Philosophy</p>
        </div>
      </section>
    </main>
  );
};

export default Index;
