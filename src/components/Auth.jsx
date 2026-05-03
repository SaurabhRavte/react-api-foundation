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
  const [msg, setMsg] = useState(null);

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
      flash("Authenticated successfully");
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
      flash("Account established. Proceed to login.");
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
    flash("Session terminated");
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
      flash("Registry updated");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  const inp =
    "w-full bg-transparent border-b border-zinc-800 text-zinc-200 px-1 py-3 text-sm outline-none focus:border-red-600 transition-all duration-500 placeholder-zinc-700";

  return (
    <div className="max-w-sm mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
      <div className="mb-12 relative">
        <div className="absolute -left-4 top-0 w-1 h-12 bg-red-600"></div>
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-white">
          Auth
        </h1>
        <p className="text-zinc-600 text-[10px] mt-2 tracking-widest uppercase italic">
          System Access Protocol
        </p>
      </div>

      {msg && (
        <div
          className={`mb-6 text-[11px] tracking-widest uppercase ${msg.type === "err" ? "text-red-500" : "text-zinc-400"}`}
        >
          // {msg.text}
        </div>
      )}

      {user ? (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center text-2xl font-light text-red-600 bg-zinc-950">
              {(user.username || "?")[0]}
            </div>
            <div>
              <p className="text-white tracking-widest text-sm uppercase">
                {user.username}
              </p>
              <p className="text-zinc-600 text-xs mt-1">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={fetchCurrentUser}
              disabled={loading}
              className="border border-zinc-800 text-zinc-400 text-[10px] py-3 uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all"
            >
              Update
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-[10px] py-3 uppercase tracking-[0.2em] hover:bg-red-700 transition-all"
            >
              Exit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-8 mb-10">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[10px] uppercase tracking-[0.3em] pb-1 ${tab === t ? "text-red-600 border-b border-red-600" : "text-zinc-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <form
            onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="space-y-6"
          >
            <input
              className={inp}
              placeholder="IDENTITY"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            {tab === "register" && (
              <input
                className={inp}
                type="email"
                placeholder="EMAIL"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            )}
            <input
              className={inp}
              type="password"
              placeholder="CIPHER"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-100 text-black text-[10px] py-4 uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all duration-500"
            >
              {loading ? "Processing..." : "Initialize Session"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
