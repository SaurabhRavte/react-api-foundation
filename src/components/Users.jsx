import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=12")
      .then((r) => r.json())
      .then((json) => setUsers(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-light tracking-[0.2em] text-white uppercase mb-16 border-b border-zinc-900 pb-8">
        Users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-zinc-950 border border-zinc-900 animate-pulse"
              />
            ))
          : users.map((u, i) => {
              const d = u.login ? u : u.data || u;
              return (
                <div key={i} className="group text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 border border-zinc-800 rotate-45 group-hover:rotate-90 transition-all duration-700"></div>
                    <img
                      src={d.picture?.large || d.avatar}
                      className="w-20 h-20 grayscale group-hover:grayscale-0 transition-all p-1"
                    />
                  </div>
                  <h3 className="text-white text-xs tracking-[0.2em] uppercase">
                    {d.name?.first} {d.name?.last}
                  </h3>
                  <p className="text-zinc-600 text-[9px] uppercase tracking-widest mt-1">
                    {d.location?.city || "Unknown sector"}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
