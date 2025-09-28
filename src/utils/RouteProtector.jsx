import { useFindAccountQuery } from "../rtk/api/Endpoint";
import { useEffect } from "react";

const RouteProtector = ({ children }) => {
    const { data, status, isLoading } = useFindAccountQuery(localStorage.getItem("id"));
    useEffect(() => {
        if (status === "fulfilled") {
            if (!data?._id) {
                window.location.href = "/splash";
                return null;
            }
        }
    }, [status]);
    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-black">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (data?._id) {
        return children;        
    }

};

export default RouteProtector;