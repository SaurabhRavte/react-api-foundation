import { useState, useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/meals?page=1&limit=12")
      .then((r) => r.json())
      .then((json) => setMeals(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[10px] tracking-[1em] text-zinc-700 uppercase animate-pulse">
        Dine Registry
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white tracking-[0.2em] uppercase mb-2">
          Meals
        </h1>
        <div className="w-20 h-px bg-red-600"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.map((m, i) => {
          const meal = m.meals?.[0] || m;
          return (
            <div
              key={i}
              onClick={() => setSelected(meal)}
              className="group cursor-pointer"
            >
              <div className="aspect-3/4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-zinc-900 p-2 bg-zinc-950">
                <img
                  src={meal.strMealThumb}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-zinc-200 text-xs tracking-widest uppercase group-hover:text-red-600 transition-colors">
                {meal.strMeal}
              </h3>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-zinc-950 border border-zinc-800 max-w-4xl w-full flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white z-10"
            >
              ✕
            </button>
            <img
              src={selected.strMealThumb}
              className="md:w-1/2 object-cover grayscale"
            />
            <div className="md:w-1/2 p-10 space-y-6 overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                {selected.strMeal}
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">
                {selected.strInstructions}
              </p>
              {selected.strYoutube && (
                <a
                  href={selected.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border border-red-900 text-red-500 text-[10px] px-6 py-3 uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all"
                >
                  Video Guide
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
