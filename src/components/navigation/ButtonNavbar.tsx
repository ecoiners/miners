import {FaHome, FaWallet} from "react-icons/fa";
import {FaPeopleGroup} from "react-icons/fa6";
import {SiGoogletasks} from "react-icons/si";
import {LuFerrisWheel} from "react-icons/lu";
import { useLocation } from "react-router-dom";

const ButtonNavbar = () => {
	const {pathname} = useLocation();
	
	const items = [
		{
			title: "Home",
			icon: <FaHome className="text-[1.2em]" />,
			href: "/app",
		},
		{
			title: "Task",
			icon: <SiGoogletasks className="text-[1.2em]" />,
			href: "/app",
		},
		{
			title: "Spin",
			icon: <LuFerrisWheel className="text-[1.2em]" />,
			href: "/app",
		},
		{
			title: "Invite",
			icon: <FaPeopleGroup className="text-[1.2em]" />,
			href: "/app",
		},
		{
			title: "Wallet",
			icon: <FaWallet className="text-[1.2em]" />,
			href: "/app",
		},
	];
	
	return (
		<div className="dock dock-xs h-10 bg-white/10">
		  {
				items.map((item, index) => (
					<button className={`${pathname === item.href && "dock-active"}`} key={index}>
					  {item.icon}
					</button>
				))
			}
		</div>
	);
};

export default ButtonNavbar;