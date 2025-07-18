// import { useNavigate } from "react-router-dom";
"use client";
import Link from "next/link";
const LandingPages = () => {
  //   const navigate = useNavigate();
  return (
    <div>
      <img src="/Brandner inno68-01.jpg" />
      <section>
        <LazyYoutubePlayer videoId="TqwuqG5PPnc" />
        <div className="w-fit mx-auto my-10">
          <Link href="/analytics">
            <button className="bg-slate-700 text-white font-semibold rounded w-[171px] h-[40px]">
              BOOK DEMO
            </button>
          </Link>
        </div>
      </section>
      <img src="/Brandner inno68-02.jpg" />
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
