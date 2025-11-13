import { Link, useLocation } from "react-router";
import { useState } from "react";
import { 
  Home, 
  PlusSquare, 
  Users, 
  PlusCircle, 
  Menu, 
  X 
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    { label: "Create Post", icon: <PlusSquare className="w-5 h-5" />, href: "/create-post" },
    { label: "Community", icon: <Users className="w-5 h-5" />, href: "/community" },
    { label: "Create Community", icon: <PlusCircle className="w-5 h-5" />, href: "/community/create" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100/80 backdrop-blur-md border-b border-base-300 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-primary">Crypto</span>Hub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                location.pathname === item.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-base-200"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="btn btn-ghost md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 border-t border-base-300 animate-fadeIn">
          <div className="flex flex-col p-3 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  location.pathname === item.href
                    ? "bg-primary/20 text-primary font-semibold"
                    : "hover:bg-base-300"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
