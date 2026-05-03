import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setProducts(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p, i) => {
          const img = p.thumbnail || p.images?.[0] || "";
          const rate = p.rating?.rate || p.rating || 0;
          const stars =
            "★".repeat(Math.round(rate)) + "☆".repeat(5 - Math.round(rate));
          return (
            <div
              key={i}
              className="border border-zinc-800 hover:border-red-700 transition-colors flex flex-col group"
            >
              <div className="aspect-square bg-white p-4 overflow-hidden">
                {img ? (
                  <img
                    src={img}
                    alt={p.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <p className="text-white text-sm font-medium leading-snug line-clamp-2 flex-1">
                  {p.title || "—"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-red-500 font-semibold text-sm">
                    ${p.price ?? "—"}
                  </span>
                  {p.category && (
                    <span className="text-zinc-600 text-xs uppercase tracking-wider border border-zinc-800 px-2 py-0.5">
                      {p.category}
                    </span>
                  )}
                </div>
                <p className="text-yellow-500 text-xs mt-1">
                  {stars}{" "}
                  <span className="text-zinc-600">
                    ({p.rating?.count || ""})
                  </span>
                </p>
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
