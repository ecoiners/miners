import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Book,
  Map,
  FileText,
  Compass,
  Activity,
  Cpu,
  Layers,
  Database,
  Code,
  Search,
  User,
  LogOut,
  Settings,
  Wallet,
  Globe,
  BarChart3,
  Users,
  Shield,
  Download,
  MessageCircle
} from 'lucide-react';

// Komponen Mobile Accordion Item
const MobileAccordionItem = ({ title, items, toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-700/50">
      <button 
        type="button" 
        aria-expanded={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full py-4 text-gray-300"
      >
        <span className="flex items-center space-x-2">
          <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
          <span>{title}</span>
        </span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="pl-6 pb-2 space-y-2">
          {items.map((item, index) => (
            <Link 
              key={index}
              to={item.href}
              target={item.target}
              className="flex items-center space-x-2 py-3 text-gray-400 hover:text-purple-400 transition-colors"
              onClick={() => {
                toggleMenu();
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Komponen User Dropdown
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-300 text-sm">{user.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-gray-300 font-medium">{user.name}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
          
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          
          <div className="border-t border-gray-700 mt-2 pt-2">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Komponen Header Utama
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuItems, setActiveMenuItems] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); // null = belum login, object = sudah login
  
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // Simulasi user login (ganti dengan auth logic sesungguhnya)
  useEffect(() => {
    // Contoh: cek jika user sudah login
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    // Simulasi login
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleMenuHover = (menuId) => {
    clearTimeout(timeoutRef.current);
    setActiveMenuItems(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuItems(null);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuItems(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Konfigurasi Menu Items
  const menuItems = {
    ecosystem: {
      title: "Ecosystem",
      columns: [
        {
          title: "Core Technology",
          links: [
            {
              icon: <Activity className="w-4 h-4 text-purple-400" />,
              label: "ECROP AI",
              href: "/ai"
            },
            {
              icon: <Cpu className="w-4 h-4 text-blue-400" />,
              label: "ECROP VM",
              href: "/vm"
            },
            {
              icon: <Layers className="w-4 h-4 text-purple-400" />,
              label: "ECROP Framework 100",
              href: "/framework"
            },
          ],
        },
        {
          title: "Applications",
          links: [
            {
              icon: <Code className="w-4 h-4 text-purple-400" />,
              label: "How To Buy",
              href: "/buy"
            },
            {
              icon: <Compass className="w-4 h-4 text-blue-400" />,
              label: "Explorer",
              href: "/explorer"
            },
            {
              icon: <Wallet className="w-4 h-4 text-purple-400" />,
              label: "ECROP Wallet",
              href: "/wallet"
            }
          ],
        },
        {
          title: "Community 100",
          links: [
            {
              icon: <FileText className="w-4 h-4 text-blue-400" />,
              label: "ECROP Documentation",
              href: "/docs"
            },
            {
              icon: <Users className="w-4 h-4 text-purple-400" />,
              label: "Referral 100",
              href: "/referral"
            },
            {
              icon: <Shield className="w-4 h-4 text-blue-400" />,
              label: "Audits 100",
              href: "/audits"
            }
          ],
        },
      ],
      featuredBox: {
        title: "Join Our Community",
        description: "ECROP Telegram the community latest 100.",
        linkText: "Join Telegram",
        linkUrl: "https://t.me/ecrop",
        bgClass: "bg-blue-500/10",
      },
    },
    
    resources: {
      title: "Resources",
      columns: [
        {
          title: "Learn",
          links: [
            {
              icon: <FileText className="w-4 h-4 text-purple-400" />,
              label: "Whitepaper 100",
              href: "/whitepaper"
            },
            {
              icon: <Download className="w-4 h-4 text-blue-400" />,
              label: "Import Token",
              href: "/import-token"
            },
            {
              icon: <Book className="w-4 h-4 text-purple-400" />,
              label: "Documentation",
              href: "/documentation"
            }
          ],
        },
        {
          title: "ECROP Tools",
          links: [
            {
              icon: <Compass className="w-4 h-4 text-purple-400" />,
              label: "Block Explorer",
              href: "/explorer",
              target: "_blank"
            },
            {
              icon: <Database className="w-4 h-4 text-blue-400" />,
              label: "Analytic",
              href: "/dashboard"
            },
            {
              icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
              label: "Dashboard",
              href: "/dashboard"
            }
          ],
        },
      ],
      featuredBox: {
        title: "Start Building Today",
        description: "Access developer resources and start building on the ECROP 100 PROTOCOL",
        linkText: "Developer Portal",
        linkUrl: "/developers",
        bgClass: "bg-green-500/10"
      },
    },
  };

  return (
    <>
      {/* Spacer untuk sticky header */}
      {isScrolled && <div className="h-20"></div>}
      
      {/* HEADER UTAMA */}
      <header 
        className={`w-full transition-all duration-500 ease-out fixed top-0 left-0 z-50 shadow-lg border-b bg-gray-900/95 backdrop-blur-md border-gray-800/50 ${
          isScrolled ? 'shadow-xl' : ''
        }`}
        ref={menuRef}
      >
        {/* BANNER MARQUEE */}
        {!isScrolled && (
          <div className="relative py-3 overflow-hidden whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="absolute inset-0 z-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px), radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px, 30px 30px",
              backgroundPosition: "0 0, 15px 15px"
            }}></div>
            
            <div className="animate-marquee inline-block whitespace-nowrap text-white relative z-10">
              <span className="mx-4 text-sm md:text-base">
                ECROP (ECR) Presale is now live! Be part of the future - claim
                your discounted tokens and exclusive access to ECROP 100 
                <span className="mx-1">🌎</span>
                Don&apos;t wait, join the innovation wave today.
                <span className="ml-1">🔥</span>
              </span>
            </div>
          </div>
        )}
        
        {/* NAVIGATION BAR */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-3 overflow-hidden">
                <div className="absolute inset-1 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ECROP
              </span>
            </Link>
          </div>
          
          {/* SEARCH BAR DESKTOP */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>
          </div>
          
          {/* NAVIGATION DESKTOP */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Menu Ecosystem */}
            <div className="relative group" 
                 onMouseEnter={() => handleMenuHover("ecosystem")} 
                 onMouseLeave={handleMenuLeave}>
              <button className="flex items-center space-x-1 py-2 px-1 transition-colors text-gray-300 hover:text-purple-400">
                <span>Ecosystem</span>
                <ChevronDown className={`transition-transform duration-300 ${
                  activeMenuItems === "ecosystem" ? "rotate-180" : ""
                }`}/>
              </button>
            </div>
            
            {/* Menu Resources */}
            <div className="relative group" 
                 onMouseEnter={() => handleMenuHover("resources")} 
                 onMouseLeave={handleMenuLeave}>
              <button className="flex items-center space-x-1 py-2 px-1 transition-colors text-gray-300 hover:text-purple-400">
                <span>Resources</span>
                <ChevronDown className={`transition-transform duration-300 ${
                  activeMenuItems === "resources" ? "rotate-180" : ""
                }`}/>
              </button>
            </div>
            
            {/* Link langsung */}
            <Link to="/explorer" className="py-2 px-1 transition-colors text-gray-300 hover:text-purple-400">
              Explorer
            </Link>
            
            <Link to="/dashboard" className="py-2 px-1 transition-colors text-gray-300 hover:text-purple-400">
              E100
            </Link>
          </nav>
          
          {/* ACTION BUTTONS DESKTOP */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button Mobile */}
            <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors lg:hidden">
              <Search className="w-5 h-5" />
            </button>
            
            {/* User Auth Section */}
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* MOBILE MENU BUTTONS */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Search Button Mobile */}
            <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* User Auth Mobile */}
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              aria-label="Menu"
              className="p-2 text-purple-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* DROPDOWN MENU DESKTOP */}
        {Object.keys(menuItems).map((menuKey) => {
          const menu = menuItems[menuKey];
          
          return (
            <div 
              key={menuKey} 
              className={`absolute left-0 w-full z-40 transition-all duration-300 transform ${
                activeMenuItems === menuKey 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 -translate-y-2 pointer-events-none"
              } bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-xl`}
              onMouseEnter={() => handleMenuHover(menuKey)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Menu Columns */}
                  {menu.columns.map((column, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                        {column.title}
                      </h3>
                      
                      <ul className="space-y-2">
                        {column.links.map((link, idx) => (
                          <li key={idx}>
                            <Link
                              to={link.href}
                              target={link.target}
                              className="flex items-center space-x-2 py-1 transition-colors duration-200 text-gray-300 hover:text-purple-400"
                              onClick={() => setActiveMenuItems(null)}
                            >
                              <span className="text-lg">{link.icon}</span>
                              <span>{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* Featured Box */}
                  <div className={`rounded-xl p-6 ${menu.featuredBox.bgClass}`}>
                    <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      {menu.featuredBox.title}
                    </h3>
                    <p className="text-sm mb-4 text-gray-300">
                      {menu.featuredBox.description}
                    </p>
                    <Link 
                      to={menu.featuredBox.linkUrl}
                      target="_blank"
                      className="inline-flex items-center space-x-1 font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                      onClick={() => setActiveMenuItems(null)}
                    >
                      <span>{menu.featuredBox.linkText}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* MOBILE MENU SIDEBAR */}
        <div className={`lg:hidden fixed inset-y-0 z-50 left-0 w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-900 border-r border-gray-800/50`} style={{height: "100vh", overflow: "auto"}}>
          
          <div className="h-full overflow-auto">
            {/* Header Mobile Menu */}
            <div className="flex justify-between items-center p-5 border-b border-gray-800/50">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <div className="relative h-10 w-10 mr-3">
                  <div className="absolute inset-1 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  ECROP
                </span>
              </Link>
              
              <button onClick={toggleMenu} className="text-purple-400 focus:outline-none" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Search Bar Mobile */}
            <div className="p-4 border-b border-gray-800/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>
            
            {/* Navigation Mobile */}
            <div className="p-5">
              <nav className="flex flex-col">
                {/* Accordion Ecosystem */}
                <MobileAccordionItem 
                  title="Ecosystem"
                  items={[
                    {
                      icon: <Activity className="w-4 h-4 text-purple-400" />,
                      label: "ECROP AI",
                      href: "/ai"
                    },
                    {
                      icon: <Cpu className="w-4 h-4 text-blue-400" />,
                      label: "ECROP VM",
                      href: "/vm"
                    },
                    {
                      icon: <Layers className="w-4 h-4 text-purple-400" />,
                      label: "ECROP Framework 100",
                      href: "/framework"
                    },
                    {
                      icon: <Compass className="w-4 h-4 text-purple-400" />,
                      label: "Explorer",
                      href: "/explorer"
                    }
                  ]}
                  toggleMenu={toggleMenu}
                />
                
                {/* Accordion Resources */}
                <MobileAccordionItem 
                  title="Resources"
                  items={[
                    {
                      icon: <FileText className="w-4 h-4 text-purple-400" />,
                      label: "Whitepaper 100",
                      href: "/whitepaper"
                    },
                    {
                      icon: <Download className="w-4 h-4 text-blue-400" />,
                      label: "Import Token",
                      href: "/import-token"
                    },
                    {
                      icon: <Book className="w-4 h-4 text-purple-400" />,
                      label: "Documentation",
                      href: "/documentation"
                    },
                    {
                      icon: <Database className="w-4 h-4 text-blue-400" />,
                      label: "Analytic",
                      href: "/dashboard"
                    },
                  ]}
                  toggleMenu={toggleMenu}
                />
                
                {/* Link langsung */}
                <Link 
                  to="/explorer"
                  className="flex items-center space-x-2 py-4 border-b border-gray-800/50 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorer</span>
                </Link>
                
                <Link 
                  to="/dashboard"
                  className="flex items-center space-x-2 py-4 border-b border-gray-800/50 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                {/* Auth Section Mobile */}
                <div className="mt-8 space-y-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-2 py-3 border border-gray-700 rounded-lg">
                        <p className="text-gray-300 font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                      <Link 
                        to="/dashboard"
                        className="block w-full text-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link 
                        to="/login"
                        className="block w-full text-center px-4 py-3 border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register"
                        className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        {/* OVERLAY MOBILE MENU */}
        {isOpen && (
          <div onClick={toggleMenu} className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"></div>
        )}
      </header>
      
      {/* STYLE UNTUK MARQUEE ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </>
  );
}