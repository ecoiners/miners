import { Outlet } from "react-router-dom";
import SideBar from "../template/Admin/Layout/SideBar";

const AdminLayout = () => {
    return (
        <div className="">

            <div className="grid-cols-5 gap-5 bg-black hidden lg:grid">
                <div className="col-span-1 overflow-hidden">
                    <div className="fixed top-0 left-0">
                        <SideBar />
                    </div>
                </div>
                <div className="col-span-4 min-h-screen">
                    <div className="bg-[#111e24] m-1 rounded-lg">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex justify-center items-center text-4xl min-h-screen">
                <p>Only for desktop</p>
            </div>
        </div>
    );
};

export default AdminLayout;