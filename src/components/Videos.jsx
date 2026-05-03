import { useState, useEffect } from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setVideos(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Videos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((v, i) => {
          const s = v.items?.snippet || v.snippet || {};
          const thumb =
            s.thumbnails?.medium?.url || s.thumbnails?.default?.url || "";
          const title = s.title || v.title || "Untitled";
          const channel = s.channelTitle || "";
          const date = s.publishedAt
            ? new Date(s.publishedAt).toLocaleDateString()
            : "";
          return (
            <div
              key={i}
              className="border border-zinc-800 hover:border-red-700 transition-colors group"
            >
              <div className="aspect-video bg-zinc-900 overflow-hidden relative">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-3xl">▶</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                  {title}
                </p>
                {channel && (
                  <p className="text-zinc-500 text-xs mt-1">{channel}</p>
                )}
                {date && <p className="text-zinc-600 text-xs mt-0.5">{date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center py-24 text-zinc-600 text-sm gap-2">
      <Spin />
      Loading…
    </div>
  );
}
function Error({ msg }) {
  return <div className="text-center py-24 text-red-500 text-sm">{msg}</div>;
}
function Spin() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
  );
}
