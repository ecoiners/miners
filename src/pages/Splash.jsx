import { useCreateAccountMutation } from "../rtk/api/Endpoint";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const Splash = () => {
    const [triggerAccount, { data, status, isSuccess }] = useCreateAccountMutation();
    const User = WebApp.initDataUnsafe?.user;  // Added optional chaining to avoid errors if `user` is undefined
    const referredBy = WebApp.initDataUnsafe?.start_param;

    // Clear localStorage to ensure fresh data every time

    useEffect(() => {
        const fetchData = async () => {
            localStorage.clear();  // Clears the localStorage at the start
            const DataObj = {
                userId: User?.id,
                username: User?.username,
                fullName: `${User?.first_name} ${User?.last_name}`,  // Ensure space between first and last name
                profilePicture: User?.photo_url,
                referredBy: referredBy,
                init: WebApp?.initData
            };
            try {
                await triggerAccount(DataObj);  // Trigger API call to create the account

            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle the error case as needed
                document.getElementById("error").classList.remove("hidden");
            }
        };

        fetchData();  // Invoke the async function on mount
    }, []);  // Effect will run when `User` or `referredBy` changes

    useEffect(() => {
        const lUSER = data?.data[0];  // Extract the user data

        if (lUSER?._id) {
            localStorage.setItem("id", lUSER?.userId || "");
            localStorage.setItem("username", lUSER?.username || "");
            localStorage.setItem("_id", lUSER?._id || "");
            if (lUSER?._id) {
                window.location.href = "/";
            } else {
                document.getElementById("error").classList.remove("hidden");
            }
        } else {
            if (isSuccess) {
                if (!lUSER?._id) {
                    document.getElementById("error").classList.remove("hidden");
                }
            }
        }
    }, [status, data])
    return (
        <div className="bg-black min-h-screen p-3">
            <div id="error" role="alert" className="alert alert-error flex items-center hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your information sync failed.</span>
            </div>
            <span className="loading absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] loading-spinner loading-lg"></span>
        </div>
    );
};

export default Splash;
