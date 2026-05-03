import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setProducts(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-light tracking-widest text-white uppercase mb-16">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-4/5 bg-zinc-950 border border-zinc-900 animate-pulse"
              />
            ))
          : products.map((p, i) => (
              <div
                key={i}
                className="group border border-zinc-900 p-4 bg-zinc-950 transition-all duration-500 hover:border-zinc-700"
              >
                <div className="aspect-square bg-white p-6 mb-6 overflow-hidden flex items-center">
                  <img
                    src={p.thumbnail || p.images?.[0]}
                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-zinc-200 text-[11px] tracking-widest uppercase line-clamp-1">
                    {p.title}
                  </h3>
                  <span className="text-red-600 text-[11px] font-mono">
                    ${p.price}
                  </span>
                </div>
                <p className="text-zinc-600 text-[9px] uppercase tracking-widest mt-1 italic">
                  {p.category}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
