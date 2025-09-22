import {FaHome, FaWallet} from "react-icons/fa";
import {FaPeopleGroup} from "react-icons/fa6";
import {SiGoogletasks} from "react-icons/si";
import {LuFerrisWheel} from "react-icons/lu";
import { useLocation, useNavigate} from "react-router-dom";

const ButtonNavbar = () => {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	
	const items = [
		{
			title: "Home",
			icon: <FaHome />,
			href: "/app",
		},
		{
			title: "Task",
			icon: <SiGoogletasks />,
			href: "/app/task",
		},
		{
			title: "Spin",
			icon: <LuFerrisWheel />,
			href: "/app/spin",
		},
		{
			title: "Invite",
			icon: <FaPeopleGroup />,
			href: "/app/invite",
		},
		{
			title: "Wallet",
			icon: <FaWallet />,
			href: "/app/wallet",
		},
	];
	
	return (
		<div className="dock dock-xs h-12 text-xl bg-white/10">
		  {
				items.map((item, index) => (
					<button onClick={() => navigate(item.href)} className={`${pathname === item.href && "dock-active text-green-600"}`} key={index}>
					  {item.icon}
					</button>
				))
			}
		</div>
	);
};

export default ButtonNavbar;