import { useNavigate } from "react-router-dom";
const LandingPages = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <img src="/Brandner inno68-01.jpg" className="absolute" />
        <div className="absolute top-[3425px] left-[191px]">
          <LazyYoutubePlayer videoId="TqwuqG5PPnc" />
        </div>
        <button
          className="bg-gradient-to-br from-secondary-11 to-primary-1 text-white font-semibold absolute top-[4163.5px] right-[141px] rounded w-[171px] h-[40px]"
          onClick={() => navigate("/overview")}
        >
          BOOK DEMO
        </button>
      </section>
    </div>
  );
};
export default LandingPages;
import { useState } from "react";

interface LazyYoutubePlayerProps {
  videoId: string;
}

export function LazyYoutubePlayer({ videoId }: LazyYoutubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="aspect-video w-[950px] mx-auto relative cursor-pointer rounded-xl overflow-hidden">
      {isPlaying ? (
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div onClick={() => setIsPlaying(true)}>
          <img
            src={thumbnail}
            alt="YouTube thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button className="text-white text-3xl bg-white/80 rounded-full px-4 py-2 shadow">
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
