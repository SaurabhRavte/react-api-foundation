import { useState } from "react";

const BASE = "https://api.freeapi.app/api/v1";

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fp_user") || "null");
    } catch {
      return null;
    }
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { text, type }

  function flash(text, type = "ok") {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed");
      const u = json.data?.user || json.data;
      localStorage.setItem("fp_user", JSON.stringify(u));
      setUser(u);
      flash("Logged in successfully");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed");
      flash("Account created! Please login.");
      setTab("login");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${BASE}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("fp_user");
    setUser(null);
    flash("Logged out");
  }

  async function fetchCurrentUser() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/current-user`, {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed");
      const u = json.data?.user || json.data;
      localStorage.setItem("fp_user", JSON.stringify(u));
      setUser(u);
      flash("Profile refreshed");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  const inp =
    "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2.5 text-sm outline-none focus:border-red-600 transition-colors placeholder-zinc-600";

  return (
    <div className="max-w-sm mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-1">
        Auth
      </h1>
      <p className="text-zinc-600 text-xs mb-6">FreeAPI Authentication</p>

      {msg && (
        <div
          className={`mb-4 px-4 py-2 text-xs border ${msg.type === "err" ? "border-red-700 text-red-400 bg-zinc-900" : "border-zinc-700 text-green-400 bg-zinc-900"}`}
        >
          {msg.text}
        </div>
      )}

      {user ? (
        <div className="border border-zinc-800 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-xl font-bold uppercase">
              {(user.username || user.email || "?")[0]}
            </div>
            <div>
              <p className="font-medium text-sm">{user.username || "—"}</p>
              <p className="text-zinc-500 text-xs">{user.email || "—"}</p>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Role</span>
              <span className="text-red-400 uppercase tracking-wider">
                {user.role || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">ID</span>
              <span className="text-zinc-400 font-mono truncate max-w-40">
                {user._id || user.id || "—"}
              </span>
            </div>
          </div>
          <button
            onClick={fetchCurrentUser}
            disabled={loading}
            className="w-full border border-zinc-700 text-white text-xs py-2 uppercase tracking-wider hover:border-white transition-colors disabled:opacity-40"
          >
            {loading ? "Loading…" : "Refresh Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full border border-red-700 text-red-500 text-xs py-2 uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex border-b border-zinc-800 mb-5">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${tab === t ? "text-red-500 border-b border-red-500" : "text-zinc-600 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                className={inp}
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                required
              />
              <input
                className={inp}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2.5 uppercase tracking-wider transition-colors disabled:opacity-40"
              >
                {loading ? "Logging in…" : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                className={inp}
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                required
              />
              <input
                className={inp}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
              <input
                className={inp}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
              <select
                className={inp}
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2.5 uppercase tracking-wider transition-colors disabled:opacity-40"
              >
                {loading ? "Registering…" : "Create Account"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
