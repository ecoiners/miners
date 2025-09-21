import React, {useEffect, useState} from "react";
import Home from "../pages/Home";
import Dayli from "../pages/Dayli";
import Airdrop from "../pages/Airdrop";
import Earn from "../pages/Earn";
import Refferals from "../pages/Refferals";
import {useLocation, useNavigate} from "react-router-dom";
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { FaGift, FaDollarSign, FaUserFriends } from "react-icons/fa";

export default function ButtonNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentScreen, setCurrentScreen] = useState("/");

  useEffect(() => {
    setCurrentScreen(location.pathname);
  }, [location]);

  const navItems = [
    { path: "/", icon: AiFillHome },
    { path: "/dayli", icon: AiFillCalendar },
    { path: "/earn", icon: FaDollarSign },
    { path: "/airdrop", icon: FaGift },
    { path: "/refferals", icon: FaUserFriends },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-2 mx-auto w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center"
            >
              <Icon
                size={26}
                className={
                  currentScreen === item.path
                    ? "text-green-500"
                    : "text-gray-400"
                }
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
