import { useState, useEffect } from "react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/quotes?page=1&limit=20")
      .then((r) => r.json())
      .then((json) => setQuotes(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-20 border-l-4 border-red-600 pl-6">
        <h1 className="text-4xl font-light tracking-[0.3em] uppercase text-white">
          Quotes
        </h1>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {loading ? (
          <div className="text-zinc-800 uppercase tracking-widest text-[10px]">
            Processing...
          </div>
        ) : (
          quotes.map((q, i) => (
            <div
              key={i}
              className="break-inside-avoid border border-zinc-900 p-8 hover:border-red-900 transition-all duration-700 bg-zinc-950/50"
            >
              <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                "{q.content || q.quote}"
              </p>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
                — {q.author || "Unknown"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
