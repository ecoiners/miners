import { useEffect } from "react";
import { useInviteTaskMutation } from "../../../rtk/api/Endpoint";
import { toast } from "react-hot-toast";
import Environment from "../../../Environment";
const InviteFriendsTask = ({ complete, refer_count, rewards }) => {

    const [TriggerInviteMutation, { status, data, error }] = useInviteTaskMutation();

    const OnclickBoost = async () => {
        TriggerInviteMutation({ userId: localStorage.getItem("_id"), refer_count: refer_count });
    };

    useEffect(() => {
        if (status === "fulfilled") {
            toast(data?.msg);
        }
    }, [status])

    return (
        <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>

                <div className="">
                    <p className="font-medium font-montserrat">Invite {refer_count} friends</p>
                    <p className="font-montserrat text-xs text-white/60 font-medium">{rewards} {Environment.SYMBOL}</p>
                </div>

            </div>
            <div className="cursor-pointer">
                {
                    complete ?
                        <button className="bg-[#27c9ff] px-3 py-1 w-16 h-8 rounded-full font-roboto text-black font-bold flex justify-center items-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 1.25C4.05 1.25 1.25 4.05 1.25 7.5C1.25 10.95 4.05 13.75 7.5 13.75C10.95 13.75 13.75 10.95 13.75 7.5C13.75 4.05 10.95 1.25 7.5 1.25ZM7.5 12.5C4.74375 12.5 2.5 10.2563 2.5 7.5C2.5 4.74375 4.74375 2.5 7.5 2.5C10.2563 2.5 12.5 4.74375 12.5 7.5C12.5 10.2563 10.2563 12.5 7.5 12.5ZM9.925 5.18125L6.25 8.85625L5.075 7.68125C4.83125 7.4375 4.4375 7.4375 4.19375 7.68125C3.95 7.925 3.95 8.31875 4.19375 8.5625L5.8125 10.1813C6.05625 10.425 6.45 10.425 6.69375 10.1813L10.8125 6.0625C11.0562 5.81875 11.0562 5.425 10.8125 5.18125C10.5687 4.9375 10.1687 4.9375 9.925 5.18125Z" fill="black" />
                            </svg>
                        </button> :
                        <p onClick={() => OnclickBoost()} className="bg-white px-3 text-black font-medium rounded-full py-1">Start</p>
                }
            </div>
        </div>
    );
};

export default InviteFriendsTask;