import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMarkAsCompleteMutation } from "../../../rtk/api/Endpoint";

const HandleClaimStateButton = ({ link, taskId }) => {
    const [isClaim, setClaim] = useState(false);
    const [triggerClaim, { isLoading }] = useMarkAsCompleteMutation(undefined);
    const [isTimerComplete, setTimerComplete] = useState(false);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        let timer;
        if (isClaim) {
            timer = setTimeout(() => {
                setTimerComplete(true);
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [isClaim]);

    const HandleClaim = async () => {
        const DataObject = {
            taskId: taskId,
            userId
        };

        await triggerClaim(DataObject);
    };

    return (
        <div>
            {isClaim ? (
                <button
                    className={`${isLoading
                            ? 'bg-white flex justify-center items-center'
                            : 'bg-white'
                        } px-3 py-1 w-16 h-8 rounded-full font-roboto text-black font-bold`}
                    onClick={HandleClaim}
                >
                    {isLoading || !isTimerComplete ? (
                        <span className="loading loading-dots loading-xs"></span>
                    ) : (
                        'Claim'
                    )}
                </button>
            ) : (
                <div className="w-16 h-8 bg-white rounded-full flex justify-center items-center">
                    <Link
                        to={link}
                        target="_blank"
                        className="px-3 py-1 font-roboto text-black font-bold"
                        onClick={() => setClaim(true)}
                    >
                        Start
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HandleClaimStateButton;
