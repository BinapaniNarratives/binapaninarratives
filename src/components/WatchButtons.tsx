import { Play } from "lucide-react";
import { useState } from "react";

const YOUTUBE_URL = "https://youtube.com/@binapaninarratives?si=w0YaL0yyAlD4oJem";
const YOUTUBE_EMBED =
  "https://www.youtube.com/embed?listType=user_uploads&list=binapaninarratives&autoplay=1";

const WatchButtons = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    setVideoOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noreferrer"
          className="bn-button inline-flex items-center gap-3 rounded-md px-7 py-4 text-sm font-black italic uppercase tracking-[0.18em]"
        >
          <Play size={16} className="fill-current" />
          Watch Now
        </a>
        <button
          type="button"
          onClick={openVideo}
          className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-7 py-4 text-sm font-black italic uppercase tracking-[0.18em] text-foreground transition hover:border-primary hover:text-primary"
        >
          <Play size={16} className="fill-current" />
          Watch Short Video
        </button>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-md bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground"
            >
              Close
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={YOUTUBE_EMBED}
                title="Binapani Narratives"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between border-t border-border p-4">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Binapani Narratives — YouTube
              </span>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.3em] text-primary hover:underline"
              >
                Open on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchButtons;
