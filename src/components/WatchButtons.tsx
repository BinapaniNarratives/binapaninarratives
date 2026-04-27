import { Play } from "lucide-react";

const YOUTUBE_URL = "https://youtube.com/@binapaninarratives?si=w0YaL0yyAlD4oJem";
const YOUTUBE_SHORTS_URL = "https://www.youtube.com/@binapaninarratives/shorts";

const WatchButtons = () => {
  return (
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
      <a
        href={YOUTUBE_SHORTS_URL}
        target="_blank"
        rel="noreferrer"
        className="bn-button inline-flex items-center gap-3 rounded-md px-7 py-4 text-sm font-black italic uppercase tracking-[0.18em]"
      >
        <Play size={16} className="fill-current" />
        Watch Short Video
      </a>
    </div>
  );
};

export default WatchButtons;
