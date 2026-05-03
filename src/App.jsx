import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Videos from "./components/Videos";
import Products from "./components/Products";
import Quotes from "./components/Quotes";
import Jokes from "./components/Jokes";
import Cats from "./components/Cats";
import Meals from "./components/Meals";
import Users from "./components/Users";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/jokes" element={<Jokes />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
