import { FaHome, FaWallet } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuFerrisWheel } from "react-icons/lu";
import { SiGoogletasks } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const nav = [
        {
            title: "Home",
            icon: <FaHome />,
            href: '/'
        },
        {
            title: "Earn",
            icon: <SiGoogletasks />,
            href: '/earn'
        },
        {
            title: "Dayli",
            icon: <LuFerrisWheel />,
            href: '/dayli'
        },
        {
            title: "invite",
            icon: <FaPeopleGroup />,
            href: '/invite'
        },
        {
            title: "Wallet",
            icon: <FaWallet />,
            href: '/wallet'
        },
    ]

    return (
        <div className="dock dock-xs h-12 bg-white/10 text-xl">
            {
                nav.map((nav, i) => (
                    <button onClick={()=> navigate(nav.href)} className={`${pathname === nav.href && 'dock-active text-green-500'}`} key={i}>
                        {nav.icon}
                    </button>
                ))
            }
        </div>
    );
};

export default BottomNav;