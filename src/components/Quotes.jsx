import { useState, useEffect } from "react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/quotes?page=1&limit=20")
      .then((r) => r.json())
      .then((json) => setQuotes(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Quotes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="border-l-2 border-red-700 border p-5 hover:border-l-white transition-colors"
          >
            <p className="text-red-600 text-4xl font-bold leading-none mb-2">
              "
            </p>
            <p className="text-white text-sm leading-relaxed">
              {q.content || q.quote || "—"}
            </p>
            <p className="text-zinc-500 text-xs mt-4 uppercase tracking-wider">
              — {q.author || "Unknown"}
            </p>
            {q.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {q.tags.map((t, ti) => (
                  <span
                    key={ti}
                    className="text-xs px-2 py-0.5 border border-zinc-800 text-zinc-600 uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
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
