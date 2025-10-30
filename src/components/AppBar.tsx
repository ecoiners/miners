import { FC, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import NetworkSwitcher from "./NetworkSwitcher";

const AppBar: FC = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItem = [
    { label: "Home", link: "#home" },
    { label: "Tools", link: "#tools" },
    { label: "Features", link: "#features" },
    { label: "Price", link: "#price" },
    { label: "Faq", link: "#faq" },
  ];

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-md border-b border-green-500/20 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          
          {/* === Logo === */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-9 w-9"
            />
            <span className="font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              ECROP 100
            </span>
          </a>

          {/* === Desktop Nav === */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItem.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-slate-200 hover:text-green-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* === Right Section (Network Switcher only) === */}
          <div className="flex items-center gap-3">
            <NetworkSwitcher />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white md:hidden p-2 rounded-md hover:bg-slate-800 transition"
            >
              {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* === Mobile Menu === */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-4 py-4 bg-slate-900/95 border-t border-green-500/10">
            {menuItem.map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-slate-200 hover:text-green-400 transition text-base font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-20">{props.children}</main>
    </div>
  );
};

export default AppBar;

/* versi 1
import { FC } from "react";
import NetworkSwitcher from "./NetworkSwitcher";
import { HiMenu } from "react-icons/hi";

const AppBar: FC = (props) => {
  const menuItem = [
    { label: "Home", link: "#home" },
    { label: "Tools", link: "#tools" },
    { label: "Features", link: "#features" },
    { label: "Price", link: "#price" },
    { label: "Faq", link: "#faq" }
  ];

  return (
    <div>
      <header id="navbar-sticky" className="navbar bg-slate-900/40 border-b border-green-500/20">
        <div className="container">
          <nav>
            <a href="/" className="flex items-center gap-2">
              <img 
                src="/assets/logo.png" 
                className="h-9 w-9" 
                alt="logo" 
              />
              <span className="font-semibold text-lg bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                ECROP 100
              </span>
            </a>
						
						<div className="mx-auto flex items-center px-2.5 lg:hidden">
						  <button 
							  className="hs-collapse-toggle bg-slate-100/10 inline-flex items-center justify-center rounded-md h-9 w-12" 
								type="button"
								data-hs-collapse="#mobileMenu"
								data-hs-type="collapse"
							>
							  <i data-lucide="menu" className="stroke-white">
								  <HiMenu/>
								</i>
							</button>
						</div>
						
						<div className="hs-collapse mx-auto mt-2 hidden grow basis-full items-center justify-center transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto" id="mobileMenu">
						  <ul id="navbar-navlist" className="navbar-nav">
							  {menuItem.map((item, index) => (
									<li className="nav-item" key={index}>
									  <a href={item.link} className="nav-link active:text-green-600">
										  {item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
						
						<NetworkSwitcher />
          </nav>
        </div>
      </header>
			
			{props.children}
    </div>
  );
};

export default AppBar;

 */