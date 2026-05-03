import { useState, useEffect } from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setVideos(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white tracking-[0.2em] uppercase">
          Videos
        </h1>
        <div className="h-0.5 w-12 bg-red-600 mt-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-zinc-950 border border-zinc-900 animate-pulse"
              />
            ))
          : videos.map((v, i) => {
              const s = v.items?.snippet || v.snippet || {};
              return (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video overflow-hidden border border-zinc-900 bg-zinc-950">
                    <img
                      src={s.thumbnails?.medium?.url}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <h3 className="mt-4 text-zinc-200 text-xs tracking-wide uppercase line-clamp-2 leading-relaxed group-hover:text-red-500 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-zinc-600 text-[9px] tracking-[0.2em] uppercase mt-2">
                    {s.channelTitle}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
