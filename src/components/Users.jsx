import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=12")
      .then((r) => r.json())
      .then((json) => setUsers(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-6">
        Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((u, i) => {
          const d = u.login ? u : u.data || u;
          const name = d.name
            ? `${d.name.first} ${d.name.last}`
            : d.username || "—";
          const avatar =
            d.picture?.large || d.picture?.medium || d.avatar || "";
          const email = d.email || "";
          const loc = d.location
            ? `${d.location.city}, ${d.location.country}`
            : "";
          const gender = d.gender || "";
          const age = d.dob?.age || "";
          return (
            <div
              key={i}
              className="border border-zinc-800 hover:border-zinc-700 transition-colors p-5 flex flex-col items-center text-center gap-3"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-zinc-800"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-red-700 flex items-center justify-center text-xl font-bold uppercase">
                  {name[0]}
                </div>
              )}
              <div>
                <p className="text-white text-sm font-medium">{name}</p>
                {email && (
                  <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-full">
                    {email}
                  </p>
                )}
                {loc && (
                  <p className="text-zinc-600 text-xs mt-0.5">📍 {loc}</p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {gender && (
                  <span className="text-xs border border-zinc-800 text-zinc-600 px-2 py-0.5 uppercase">
                    {gender}
                  </span>
                )}
                {age && (
                  <span className="text-xs border border-zinc-800 text-zinc-600 px-2 py-0.5">
                    Age {age}
                  </span>
                )}
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
