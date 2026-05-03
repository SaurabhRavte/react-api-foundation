import { useState, useEffect } from "react";

export default function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomjokes?page=1&limit=10")
      .then((r) => r.json())
      .then((json) => setJokes(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function toggle(i) {
    setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Jokes
      </h1>
      <div className="space-y-3">
        {jokes.map((j, i) => {
          const setup = j.setup || j.joke || j.content || "—";
          const punchline = j.punchline || "";
          return (
            <div
              key={i}
              className="border border-zinc-800 p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="flex gap-4">
                <span className="text-red-700 text-xs font-mono mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed">{setup}</p>
                  {punchline && (
                    <>
                      <button
                        onClick={() => toggle(i)}
                        className="text-red-500 text-xs mt-3 hover:underline uppercase tracking-wider"
                      >
                        {revealed[i]
                          ? "Hide punchline ↑"
                          : "Reveal punchline ↓"}
                      </button>
                      {revealed[i] && (
                        <p className="text-zinc-400 text-sm mt-2 italic border-l border-red-800 pl-3">
                          {punchline}
                        </p>
                      )}
                    </>
                  )}
                  {j.type && (
                    <span className="inline-block mt-3 text-xs border border-zinc-800 text-zinc-600 px-2 py-0.5 uppercase">
                      {j.type}
                    </span>
                  )}
                </div>
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
