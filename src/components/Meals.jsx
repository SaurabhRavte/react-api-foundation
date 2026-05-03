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

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Meals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {meals.map((m, i) => {
          const meal = m.meals?.[0] || m;
          return (
            <div
              key={i}
              onClick={() => setSelected(meal)}
              className="border border-zinc-800 hover:border-red-700 transition-colors cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden bg-zinc-900">
                {meal.strMealThumb ? (
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium">
                  {meal.strMeal || m.name || "—"}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {meal.strCategory && (
                    <span className="text-xs border border-zinc-800 text-zinc-600 px-2 py-0.5 uppercase">
                      {meal.strCategory}
                    </span>
                  )}
                  {meal.strArea && (
                    <span className="text-xs border border-zinc-800 text-zinc-600 px-2 py-0.5 uppercase">
                      {meal.strArea}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-zinc-950 border border-zinc-800 max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider">
                {selected.strMeal}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            {selected.strMealThumb && (
              <img
                src={selected.strMealThumb}
                className="w-full aspect-video object-cover mb-4"
              />
            )}
            <div className="flex gap-2 mb-4">
              {selected.strCategory && (
                <span className="text-xs border border-zinc-700 text-zinc-500 px-2 py-0.5 uppercase">
                  {selected.strCategory}
                </span>
              )}
              {selected.strArea && (
                <span className="text-xs border border-zinc-700 text-zinc-500 px-2 py-0.5 uppercase">
                  {selected.strArea}
                </span>
              )}
            </div>
            {selected.strInstructions && (
              <p className="text-zinc-400 text-xs leading-relaxed line-clamp-6">
                {selected.strInstructions}
              </p>
            )}
            {selected.strYoutube && (
              <a
                href={selected.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 uppercase tracking-wider transition-colors"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      )}
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
