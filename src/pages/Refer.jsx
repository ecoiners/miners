import { useState } from "react";
import refer_gif from "../assets/images/bull-attacking.jpg";
import toast from "react-hot-toast";
import { useReferListQuery } from "../rtk/api/Endpoint";
import ImageWithFallback from "../components/ui/ImageFallback";
import { TonConnectButton } from "@tonconnect/ui-react";
import Environment from "../Environment";

const Refer = () => {
    const [refer, setRefer] = useState(false);
    const userId = localStorage.getItem("id");
    const { data, isFetching } = useReferListQuery(localStorage.getItem("id"));
    return (
        <div className="bg-black  relative min-h-[90vh]">
            {
                refer === true &&
                <dialog id="my_modal_5" open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div onClick={() => {
                            window.location.href = `https://t.me/share/url?text=${Environment.APP_LINK}?startapp=${userId}\n\n\n 
                            Join me on ${Environment.PROJECT_NAME} and let's earn together! Use my invite link to join the fun. 🌟`;
                        }} className="w-full p-[1px] rounded-md bg-gradient-to-r from-[#27C9FF] to-[#FBD130]">
                            <button className="w-full py-2 bg-black rounded-md font-roboto text-xl">Send</button>
                        </div>

                        <div className="w-full p-[1px] mt-3 rounded-md bg-gradient-to-r from-[#27C9FF] to-[#FBD130]" onClick={() => {
                            toast.success('refer link copyed!');
                            navigator.clipboard.writeText(Environment.APP_LINK+'?startapp=' + userId);
                        }}>
                            <button className="w-full py-2 bg-black rounded-md font-roboto text-xl">Copy link</button>
                        </div>
                        <p className="font-roboto text-xl text-white font-medium text-center mt-5 cursor-pointer" onClick={() => setRefer(false)}>Close</p>

                    </div>
                </dialog>
            }

            <div className={`w-full ${refer === true ? 'opacity-30' : 'opacity-100'} `}>
                <div className="flex justify-between items-center w-full p-3">
                    <p className="capitalize text-xl font-medium text-white">{Environment.PROJECT_NAME}</p>
                    <TonConnectButton />
                </div>

                <div className="bg-black relative min-h-[40vh] flex justify-center items-center flex-col p-3">

                    <p className="text-white text-2xl font-bold text-center">Invite friends <span className="block">and get more {Environment.SYMBOL}</span></p>

                    <div className="w-fit h-fit relative mx-auto mt-0">
                        <img src={refer_gif} alt="refer" className="size-32 relative z-10" />
                    </div>
                </div>

                <div className="bg-white w-full bg-opacity-10 px-3 rounded-t-3xl pt-3 border-t min-h-[50vh]">
                    <div className="">
                        <p className="font-roboto text-white font-semibold text-xl mb-5">{data?.data?.length} friend</p>
                        <div className="flex flex-col gap-3 ">
                            {
                                isFetching ?
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full skeleton">
                                                </div>
                                                <p className="skeleton w-28 h-6 bg-white">{data?.fullName}</p>
                                            </div>
                                            <p className="skeleton w-6 h-6 bg-white"></p>
                                        </div>
                                    </div> :
                                    data?.data?.map((data, index) =>
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 bg-white rounded-full">
                                                    <ImageWithFallback name={data?.fullName} url={data?.profilePicture ? data?.profilePicture : ''} />
                                                </div>
                                                <div className="">
                                                    <p className="font-roboto text-sm text-white capitalize">{data?.fullName}</p>
                                                    <p className="font-roboto text-xs text-white">{data?.userId}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>


                <button onClick={() => setRefer(true)} className="w-4/5 left-[50%] -translate-x-[50%] fixed bottom-24 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 text-white font-roboto text-xl py-2 rounded-lg font-bold z-50">Invite friends</button>
            </div>

        </div >
    );
};

export default Refer;