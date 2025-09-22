import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { FaGift, FaDollarSign, FaUserFriends } from "react-icons/fa";

export default function ButtonNavbar() {
  const location = useLocation();

  const tabs = [
    { path: "/", icon: AiFillHome, label: "Home" },
    { path: "/dayli", icon: AiFillCalendar, label: "Dayli" },
    { path: "/earn", icon: FaDollarSign, label: "Earn" },
    { path: "/airdrop", icon: FaGift, label: "Airdrop" },
    { path: "/refferals", icon: FaUserFriends, label: "Refferals" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center py-2 px-4 relative"
            >
              <div
                className={`p-2 rounded-full transition ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gray-800"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
              </div>

              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-green-400 font-medium" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>

              {isActive && (
                <div className="absolute -top-1 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
