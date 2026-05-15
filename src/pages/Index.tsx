import { Sparkles, Video } from "lucide-react";
import WatchButtons from "@/components/WatchButtons";
import ThemeToggle from "@/components/ThemeToggle";
import AiChatBox from "@/components/AiChatBox";
import binapaniLogo from "@/assets/binapani-logo.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import "../styles-bn.css";

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
                  <img src={binapaniLogo} alt="Binapani Narratives logo" className="h-20 sm:h-28 w-auto object-contain" />
                </a>
              </div>

              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <section id="home" className="relative flex min-h-screen items-center justify-center px-5 pb-14 pt-16 text-center">
            <div className="mx-auto max-w-6xl animate-fade-in">
              <div className="bn-pill mx-auto mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.24em]">
                <span className="relative inline-flex">
                  <Sparkles className="sparkle-rainbow h-4 w-4" />
                </span>
                Subscribe Now
              </div>

              <h1 className="mx-auto mt-9 flex max-w-7xl justify-center">
                <img src={binapaniLogo} alt="Binapani" className="w-full max-w-[1600px] object-contain" />
              </h1>

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

          <section className="px-5 pb-20 pt-8 sm:px-6">
            <AiChatBox />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

