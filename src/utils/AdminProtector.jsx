import { useLoginAdminMutation } from "../rtk/api/AdminEndpoint";
import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const AdminProtector = ({ children }) => {
    const secret = localStorage.getItem("secret");
    const [triggerLogin, { data, isSuccess, isError, isLoading }] = useLoginAdminMutation();
    const link = useLocation()?.pathname;
    useEffect(() => {
        if (secret) {
            triggerLogin({ secret: secret })
        }
    }, [])

    if (isSuccess) {
        if (link === '/admin/login') {
            return (
                <div className="">
                    <Navigate to={'/admin'} />
                </div>
            )
        } else {
            return (
                <div>
                    {children}
                </div>
            );
        }
    }
    console.log(isError);
    
   
    if (isLoading === true) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#041218]">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <p className="font-roboto text-white text-sm">It seems like you're not an authentic person. Please go to hell and come back after proving you're a valid person...</p>

            <Link to={'/admin/login'} replace className=" btn mt-5">Authenticate</Link>
        </div>
    )
};

export default AdminProtector;