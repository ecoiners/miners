import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Coins, Gift, User, Menu, X, LogOut } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: <Wallet className="w-5 h-5" /> },
    { name: "Earn Crypto", href: "/earn", icon: <Coins className="w-5 h-5" /> },
    { name: "Airdrops", href: "/airdrops", icon: <Gift className="w-5 h-5" /> },
    { name: "My Points", href: "/points", icon: <User className="w-5 h-5" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-200 sticky top-0 z-50 shadow-lg border-b border-base-300">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </div>
          {isMenuOpen && (
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className={`flex items-center gap-2 ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
              <div className="divider my-1"></div>
              <li>
                <a className="flex items-center gap-2 text-error">
                  <LogOut className="w-5 h-5" />
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl gap-2">
          <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:inline">CryptoEarn</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href}
                className={`flex items-center gap-2 ${isActive(item.href) ? 'bg-primary text-primary-content' : ''}`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end gap-2">
        {/* Points Balance */}
        <div className="hidden sm:flex items-center gap-2 bg-primary/20 px-3 py-2 rounded-lg">
          <div className="badge badge-primary">100</div>
          <span className="text-sm font-semibold">Points</span>
        </div>

        {/* User Menu */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li className="menu-title">
              <span>My Account</span>
            </li>
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Transaction History</a></li>
            <div className="divider my-1"></div>
            <li><a className="text-error">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
