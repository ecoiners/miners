import { Link } from "react-router";
import { useState } from 'react';
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
  
  const navItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    { label: "Create Post", icon: <PlusSquare className="w-5 h-5" />, href: "/create-post" },
    { label: "Community", icon: <Users className="w-5 h-5" />, href: "/community" },
    { label: "Create Community", icon: <PlusCircle className="w-5 h-5" />, href: "/community/create" }
  ];
  
  return (
    <nav className="navbar bg-base-100 shadow-lg border-b border-base-300">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <button 
            tabIndex={0} 
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl ml-2 lg:ml-0">
          Sosmed
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 animate-gradient">
            ECROP
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.href} 
                className="flex items-center gap-2 text-base-content hover:text-primary transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {/* Placeholder for user actions - bisa ditambahkan nanti */}
        <button className="btn btn-ghost btn-circle">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-50">
          <ul className="menu menu-vertical p-4 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.href} 
                  className="flex items-center gap-3 text-base-content hover:text-primary hover:bg-base-200 rounded-lg p-3 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}