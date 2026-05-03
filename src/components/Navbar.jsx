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
    <nav className="border-b border-zinc-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 h-12 overflow-x-auto">
        <span className="text-red-600 font-bold text-sm tracking-widest uppercase mr-4 shrink-0">
          FREEAPI
        </span>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `px-3 py-1.5 text-xs uppercase tracking-widest shrink-0 transition-colors duration-150 ${
                isActive
                  ? "text-red-500 border-b border-red-500"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
