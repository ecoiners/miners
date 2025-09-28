import { Outlet } from "react-router-dom";
import BottomNavigation from "../ui/BottomNavigation";
import WebApp from "@twa-dev/sdk";
import qr from "../../assets/images/qr.png";
import { Toaster } from "react-hot-toast";

const MainLayouts = () => {


    return (
        <div data-theme="black" className="bg-black min-h-screen">
            <Toaster />
            {
                WebApp.platform === 'ios' || WebApp.platform === 'android' || WebApp.platform === 'android_x' ?
                    <>
                        <div className="mb-16">
                            <Outlet />
                        </div>
                        <BottomNavigation />
                    </>
                    :
                    <>
                        {/* <div className="bg-black min-h-screen p-5 flex justify-center items-center flex-col gap-4">
                            <p className="text-white">The app is only for mobile...</p>
                            <div className="bg-gray-600 p-1">
                                <img src={qr} alt="" />
                            </div>
                            <p className="text-center text-2xl text-white">@SFT_Appbot</p>
                        </div> */}
                        <div className="mb-16">
                            <Outlet />
                        </div>
                        <BottomNavigation />
                    </>
            }

        </div>
    );
};

export default MainLayouts;