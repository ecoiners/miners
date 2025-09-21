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
		{
			path: "/",
			icon: <AiFillHome size={22}/>,
			label: "Home",
		},
		{
			path: "/dayli",
			icon: <AiFillCalendar size={22} />,
			label: "Dayli",
		},
		{
			path: "/earn",
			icon: <FaDollarSign size={22} />,
			label: "Earn",
		},
		{
			path: "/airdrop",
			icon: <FaGift size={22} />,
			label: "Airdrop",
		},
		{
			path: "/refferals",
			icon: <FaUserFriends size={22} />,
			label: "Refferals",
		}
	];
	
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-green-600 z-50">
		  <div className="flex justify-around items-center py-2 mx-auto w-full">
			  {
					navItems.map((item) => (
						<button 
						  key={item.path}
							onClick={() => navigate(item.path)}
							className={`flex flex-col px-3 py-1 transition-colors duration-200 text-white ${currentScreen === item.path ? "bg-green-600" : ""}`}
						>
						  {item.icon}
						  <span className="text-xs mt-1">{item.label}</span>
						</button>
					))
				}
			</div>
		</nav>
	);
};