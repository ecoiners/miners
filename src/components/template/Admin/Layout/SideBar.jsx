import { useLocation } from "react-router-dom";
import time_icon from "../../../../assets/images/time.gif";

const SideBar = () => {
    const link = useLocation().pathname;

    return (
        <div className="bg-black min-h-screen relative">
            <div className="p-[1px] bg-gradient-to-l rounded-b-xl from-transparent via-[#FBD130] to-transparent bg-opacity-30">
                <div className="flex justify-between gap-3 overflow-hidden p-5 bg-[#041218] rounded-b-xl ">
                    <img src={time_icon} className="size-16" />
                    <p className="text-2xl text-transparent bg-gradient-to-r from-[#27C9FF] to-[#FBD130] bg-clip-text">
                        <span className="block">Control</span>
                        <span>Dashboard</span>
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-l rounded-b-xl from-transparent via-[#27C9FF] to-black my-3 w-full h-[1px]"></div>

            <div className="flex flex-col gap-3 ">
                <a href="/admin" className="p-5 relative flex justify-start overflow-hidden items-center">
                    <div className="absolute left-0 w-[1px] z-10 h-full bg-[#27C9FF]"></div>
                    <div className="absolute right-0 w-[1px] z-10 h-full bg-[#FBD130]"></div>
                    <div className="w-full h-full absolute left-0 bg-gradient-to-r from-[#27C9FF14] to-[#FBD13014] z-0"></div>
                    <div className={`absolute right-3 z-10 ${link === '/admin' ? 'block' : link === '/admin/' ? 'block' : 'hidden'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#FBD130" />
                        </svg>
                    </div>
                    <p className="font-roboto text-sm relative z-10 text-[#D9D9D9]">User Management</p>
                </a>

                <a href="/admin/task" className="p-5 relative flex justify-start overflow-hidden items-center">
                    <div className="absolute left-0 w-[1px] z-10 h-full bg-[#27C9FF]"></div>
                    <div className="absolute right-0 w-[1px] z-10 h-full bg-[#FBD130]"></div>
                    <div className="w-full h-full absolute left-0 bg-gradient-to-r from-[#27C9FF14] to-[#FBD13014] z-0"></div>
                    <div className={`absolute right-3 z-10 ${link === '/admin/task' ? 'block' : 'hidden'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#FBD130" />
                        </svg>
                    </div>
                    <p className="font-roboto text-sm relative z-10 text-[#D9D9D9]">Task Management</p>
                </a>

                {/* <a href="/admin/distribution" className="p-5 relative flex justify-start overflow-hidden items-center">
                    <div className="absolute left-0 w-[1px] z-10 h-full bg-[#27C9FF]"></div>
                    <div className="absolute right-0 w-[1px] z-10 h-full bg-[#FBD130]"></div>
                    <div className="w-full h-full absolute left-0 bg-gradient-to-r from-[#27C9FF14] to-[#FBD13014] z-0"></div>
                    <div className={`absolute right-3 z-10 ${link === '/admin/distribution' ? 'block' : 'hidden'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <path d="M0.325756 8.7026C0.337756 8.7126 0.353755 8.7166 0.365755 8.7266L8.07976 15.7086C8.51376 16.0986 9.21776 16.0986 9.65176 15.7086C9.65576 15.7046 9.65776 15.7006 9.65976 15.6966C9.76485 15.6098 9.84972 15.5012 9.90845 15.3782C9.96717 15.2552 9.99833 15.1209 9.99976 14.9846L9.99976 1.0186C9.99751 0.879825 9.96483 0.743234 9.904 0.618477C9.84318 0.49372 9.7557 0.383841 9.64776 0.2966L9.65176 0.292601C9.43338 0.103861 9.15439 0 8.86576 0C8.57712 0 8.29813 0.103861 8.07976 0.292601L0.325756 7.2906C0.223635 7.37772 0.141628 7.48596 0.0853958 7.60784C0.0291634 7.72973 4.19617e-05 7.86237 4.19617e-05 7.9966C4.19617e-05 8.13083 0.0291634 8.26347 0.0853958 8.38536C0.141628 8.50724 0.223635 8.61548 0.325756 8.7026Z" fill="#FBD130" />
                        </svg>
                    </div>
                    <p className="font-roboto text-sm relative z-10 text-[#D9D9D9]">Distribution Management</p>
                </a> */}
            </div>

            <div onClick={()=> window. location. reload(false)} className="absolute bottom-5 left-[50%] -translate-x-[50%] bg-gradient-to-r from-[#27C9FF] to-[#FBD130] p-[1px] rounded-md">
                <button className="font-roboto bg-black rounded-md w-full h-full text-white px-5 py-1">Reload</button>
            </div>
        </div>
    );
};

export default SideBar;