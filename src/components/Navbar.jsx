import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Auth" },
  { to: "/videos", label: "Videos" },
  { to: "/products", label: "Products" },
  { to: "/quotes", label: "Quotes" },
  { to: "/jokes", label: "Jokes" },
  { to: "/cats", label: "Cats" },
  { to: "/meals", label: "Meals" },
  { to: "/users", label: "Users" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0 mr-12">
          <div className="w-5 h-5 bg-red-600 rotate-45"></div>
          <span className="text-white font-light text-sm tracking-[0.4em] uppercase">
            API Call
          </span>
        </div>
        <div className="flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.2em] transition-all hover:text-red-500 shrink-0 ${isActive ? "text-red-600" : "text-zinc-500"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
