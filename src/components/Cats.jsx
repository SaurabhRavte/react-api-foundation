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
      setError(null);

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
    setError(null);

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
    if (url && !saved.includes(url)) {
      setSaved((s) => [...s, url]);
    }
  }

  const imgUrl = cat?.url || cat?.image || "";
  const name = cat?.breeds?.[0]?.name || cat?.id || "Random Cat";

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Cats
      </h1>

      <div className="border border-zinc-800 mb-4 aspect-video bg-zinc-900 overflow-hidden flex items-center justify-center">
        {loading ? (
          <Spin />
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : imgUrl ? (
          <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <p className="text-zinc-600 text-sm">No image</p>
        )}
      </div>

      {cat && !loading && <p className="text-zinc-600 text-xs mb-4">{name}</p>}

      <div className="flex gap-3 justify-center mb-8">
        <button
          onClick={fetchCat}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-5 py-2 uppercase tracking-wider transition-colors disabled:opacity-40"
        >
          Next Cat
        </button>

        <button
          onClick={saveCat}
          disabled={!cat || loading}
          className="border border-zinc-700 text-white text-xs px-5 py-2 uppercase tracking-wider hover:border-white transition-colors disabled:opacity-40"
        >
          ♥ Save
        </button>
      </div>

      {saved.length > 0 && (
        <div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
            Saved ({saved.length})
          </p>
          <div className="grid grid-cols-4 gap-2">
            {saved.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="saved cat"
                className="aspect-square object-cover border border-zinc-800 hover:border-red-700 transition-colors"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Spin() {
  return (
    <span className="inline-block w-5 h-5 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
  );
}
