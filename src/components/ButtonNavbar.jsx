import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { FaGift, FaDollarSign, FaUserFriends } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ButtonNavbar() {
  const menus = [
    { name: "Home", icon: <AiFillHome size={22} />, dis: "translate-x-0", path: "/" },
    { name: "Invite", icon: <FaUserFriends size={22} />, dis: "translate-x-16", path: "/invite" },
    { name: "Earn", icon: <FaDollarSign size={22} />, dis: "translate-x-32", path: "/earn" },
    { name: "Airdrop", icon: <FaGift size={22} />, dis: "translate-x-48", path: "/airdrop" },
    { name: "Dayli", icon: <AiFillCalendar size={22} />, dis: "translate-x-64", path: "/dayli" },
  ];

  const location = useLocation();
  const activeIndex = menus.findIndex((m) => m.path === location.pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 max-h-[4.4rem] px-6 rounded-t-xl z-50">
      <ul className="flex relative">
        <span
          className={`${menus[activeIndex]?.dis || "translate-x-0"} border-4 border-gray-900 bg-green-600 h-16 w-16 rounded-full absolute -top-5 duration-500`}
        >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
        </span>
        {menus.map((menu, index) => (
          <li key={index} className="w-16">
            <Link
              to={menu.path}
              className="flex flex-col text-center pt-6 text-white"
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  index === activeIndex ? "-mt-6 text-green-500" : "text-gray-400"
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={`${
                  activeIndex === index
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
