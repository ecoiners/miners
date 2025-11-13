import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  Activity,
  Cpu,
  Layers,
  Code,
  Compass,
  Map,
  FileText,
  Book,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = {
    ecosystem: {
      title: "Ecosystem",
      columns: [
        {
          title: "Core Technology",
          links: [
            { icon: <Activity className="text-fuchsia-500 w-4 h-4" />, label: "ECROP AI", href: "#ai" },
            { icon: <Cpu className="text-indigo-500 w-4 h-4" />, label: "ECROP VM", href: "#vm" },
            { icon: <Layers className="text-fuchsia-500 w-4 h-4" />, label: "ECROP Framework 100", href: "#framework" },
          ],
        },
      ],
    },
    app: {
      title: "Applications",
      links: [
        { icon: <Code className="text-fuchsia-500 w-4 h-4" />, label: "How To Buy", href: "#buy" },
        { icon: <Compass className="text-indigo-500 w-4 h-4" />, label: "Explorer", href: "#explorer" },
        { icon: <Map className="text-fuchsia-500 w-4 h-4" />, label: "ECROP Wallet", href: "#wallet" },
      ],
    },
    sosmed: {
      title: "Sosmed 100",
      links: [
        { icon: <FileText className="text-indigo-500 w-4 h-4" />, label: "Create Post", href: "/create" },
        { icon: <Book className="text-fuchsia-500 w-4 h-4" />, label: "Community", href: "/com" },
        { icon: <Compass className="text-indigo-500 w-4 h-4" />, label: "Create Community", href: "#a" },
      ],
    },
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100/80 backdrop-blur-md border-b border-base-300 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-primary">ECROP</span>
          <span className="text-base-content">100</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {Object.entries(navItems).map(([key, section]) => (
            <div key={key} className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="font-semibold cursor-pointer hover:text-primary"
              >
                {section.title}
              </div>

              {/* Dropdown Content */}
              <div
                tabIndex={0}
                className="dropdown-content z-[1] p-4 shadow-xl bg-base-200 rounded-lg w-64"
              >
                {section.columns ? (
                  section.columns.map((col, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-semibold mb-2 text-primary">
                        {col.title}
                      </h4>
                      {col.links.map((link, idx) => (
                        <Link
                          key={idx}
                          to={link.href}
                          className={`flex items-center gap-2 py-1 rounded-md transition ${
                            location.pathname === link.href
                              ? "text-primary"
                              : "hover:text-primary"
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.href}
                      className={`flex items-center gap-2 py-1 rounded-md transition ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "hover:text-primary"
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
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

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 border-t border-base-300 animate-in slide-in-from-top p-4">
          {Object.entries(navItems).map(([key, section]) => (
            <div key={key} className="mb-4">
              <h3 className="font-semibold text-primary mb-2">
                {section.title}
              </h3>
              {section.columns
                ? section.columns.flatMap((col) =>
                    col.links.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2 py-1 rounded-md transition ${
                          location.pathname === link.href
                            ? "text-primary"
                            : "hover:text-primary"
                        }`}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))
                  )
                : section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 py-1 rounded-md transition ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "hover:text-primary"
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
