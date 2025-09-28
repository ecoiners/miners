import { TonConnectButton } from "@tonconnect/ui-react";
import bull_image from "../assets/images/bull-attacking.jpg";
import { useEffect, useState } from "react";
const Airdrop = () => {
    const targetDate = new Date("2024-11-20T00:00:00");

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="bg-black relative">
            <div className="p-3 ">

                <div className="flex justify-between items-center">
                    <p className="capitalize text-xl font-medium text-white">Hyper bull</p>
                    <TonConnectButton />
                </div>
                <img src={bull_image} className="h-40 mx-auto" alt="" />
            </div>

            <div className="relative bg-white bg-opacity-10 px-3 min-h-[70vh]  border-white border-t backdrop-blur-2xl rounded-t-3xl">
                <p className="text-white text-3xl font-medium text-center mt-5">Listing Date</p>

                {/* <div className="grid grid-cols-3 mt-4 gap-5 text-center auto-cols-max mx-auto w-full">
                    <div className="flex flex-col p-2 bg-neutral rounded-3xl text-neutral-content items-center justify-center">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": Number(timeLeft.days) || 0 }}></span>
                        </span>
                        days
                    </div>
                    <div className="flex flex-col p-2 bg-neutral text-neutral-content items-center justify-center rounded-3xl">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": Number(timeLeft.hours) || 0 }}></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col p-2 bg-neutral text-neutral-content items-center justify-center rounded-3xl">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": Number(timeLeft.minutes) || 0 }}></span>
                        </span>
                        min
                    </div>

                </div>

                <div className="flex flex-col justify-center items-center mt-5">
                    <p className="text-white text-xl">Be Ready</p>
                </div> */}
            </div>
        </div >
    );
};

export default Airdrop;