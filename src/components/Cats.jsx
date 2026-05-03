import { useState, useEffect } from "react";

export default function Cats() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState([]);

  async function fetchCatData() {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/cats/cat/random",
    );
    const json = await res.json();
    return json.data;
  }

  useEffect(() => {
    let ignore = false;
    async function loadCat() {
      setLoading(true);
      try {
        const data = await fetchCatData();
        if (!ignore) setCat(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadCat();
    return () => {
      ignore = true;
    };
  }, []);

  async function fetchCat() {
    setLoading(true);
    try {
      const data = await fetchCatData();
      setCat(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function saveCat() {
    const url = cat?.url || cat?.image;
    if (url && !saved.includes(url)) setSaved((s) => [...s, url]);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-4">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-white">
          Cats
        </h1>
        <p className="text-[10px] text-zinc-500 tracking-widest uppercase italic">
          Subject: Feline
        </p>
      </div>

      <div className="relative">
        <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-red-600"></div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b border-r border-red-600"></div>
        <div className="bg-zinc-950 border border-zinc-900 aspect-video flex items-center justify-center overflow-hidden">
          {loading ? (
            <div className="animate-pulse text-zinc-800 text-xs uppercase tracking-widest">
              Loading...
            </div>
          ) : (
            <img
              src={cat?.url || cat?.image}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase">
          {cat?.breeds?.[0]?.name || "Unidentified Subject"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={fetchCat}
            disabled={loading}
            className="px-8 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all"
          >
            Next
          </button>
          <button
            onClick={saveCat}
            className="px-8 py-3 border border-zinc-800 text-zinc-400 text-[10px] uppercase tracking-[0.2em] hover:border-white transition-all"
          >
            Preserve
          </button>
        </div>
      </div>

      {saved.length > 0 && (
        <div className="mt-20 border-t border-zinc-900 pt-8 grid grid-cols-4 md:grid-cols-6 gap-2">
          {saved.map((url, i) => (
            <img
              key={i}
              src={url}
              className="aspect-square object-cover opacity-40 hover:opacity-100 border border-transparent hover:border-red-600 transition-all"
            />
          ))}
        </div>
      )}
    </div>
  );
}
