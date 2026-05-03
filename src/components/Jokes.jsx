import { useState, useEffect } from "react";

export default function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomjokes?page=1&limit=10")
      .then((r) => r.json())
      .then((json) => setJokes(json.data?.data || json.data || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-light tracking-[0.4em] uppercase text-white">
          Jokes
        </h1>
        <div className="w-12 h-0.5 bg-red-600 mx-auto mt-4"></div>
      </div>

      <div className="space-y-12">
        {loading ? (
          <div className="text-center text-[10px] uppercase tracking-widest text-zinc-800">
            Processing...
          </div>
        ) : (
          jokes.map((j, i) => (
            <div
              key={i}
              className="group relative pl-12 border-l border-zinc-900 py-4 hover:border-red-900 transition-colors"
            >
              <span className="absolute left-0 top-6 text-[10px] font-mono text-zinc-800 group-hover:text-red-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-zinc-300 text-lg font-light leading-relaxed mb-6">
                {j.setup || j.joke || j.content}
              </p>
              {j.punchline && (
                <div>
                  <button
                    onClick={() =>
                      setRevealed({ ...revealed, [i]: !revealed[i] })
                    }
                    className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors underline decoration-red-900 underline-offset-8"
                  >
                    {revealed[i] ? "Hide" : "Reveal Answer"}
                  </button>
                  {revealed[i] && (
                    <p className="mt-8 text-red-600 text-sm italic animate-in slide-in-from-left duration-500">
                      — {j.punchline}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
