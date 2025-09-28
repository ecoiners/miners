import { useSelector } from "react-redux";
import money_img from "../assets/images/money_flying.gif";
import { useGetWithdrawStatusQuery, useMakeWithdrawMutation, usePointTableQuery } from "../rtk/api/Endpoint";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";


const Withdraw = () => {
    const userId = useSelector((state => state?.UserInfo?._id));
    const { data, isFetching } = usePointTableQuery(userId);
    const { register, handleSubmit, reset } = useForm();
    const [triggerWithdraw] = useMakeWithdrawMutation();
    const { data: withdraw_data } = useGetWithdrawStatusQuery(userId);

    const isValidSolanaAddress = (address) => {
        try {
            const publicKey = new PublicKey(address);
            return PublicKey.isOnCurve(publicKey.toBuffer());
        } catch (e) {
            return false;
        }
    }


    const HandleWithdraw = e => {
        if (isValidSolanaAddress(e?.address)) {
            if (data?.point >= 5) {
                const arg = {
                    _userId: userId,
                    amount: data?.point,
                    address: e?.address
                }

                triggerWithdraw(arg);

                reset();
            } else {
                toast.error('You do not have enough $SBP to withdraw.');
            }
        } else {
            toast.error('Address is not valid.');
        }
    }

    return (
        <div className='bg-black min-h-[90vh] flex justify-center flex-col h-full w-full relative'>
            <p className="font-roboto text-xs capitalize text-center absolute top-2 left-[50%] -translate-x-[50%] text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text">Withdraw</p>
            <div className="w-full h-full flex justify-center items-center flex-col gap-5 pt-5 relative">
                <div className="w-full h-fit relative">
                    <div className="relative size-28 m-auto flex justify-center items-center">
                        <div className="bg-gradient-to-r from-[#27C9FF] to-[#FBD130] blur-[88px] w-full h-full absolute z-0"></div>

                        <img src={money_img} alt="" className="w-full h-full" />
                    </div>
                    <p className="font-roboto text-2xl font-bold text-center"><span className="text-transparent bg-gradient-to-r from-[#27C9FF] to-[#FBD130] bg-clip-text ">SBP</span> ={isFetching ? <div className="">0</div> :
                        <span>{` ${Number(data?.point).toFixed(2)}`}</span>
                    }</p>

                    <form onSubmit={handleSubmit(HandleWithdraw)} className="mx-5 mt-5">
                        <input {...register('address')} className="w-full outline-none bg-transparent border py-1 px-3 rounded-xl border-opacity-30 border-white" placeholder="Enter your sol address!" />

                        <div className="bg-gradient-to-r from-[#27C9FF] to-[#FBD130] p-[1px] mx-auto mt-5 rounded-xl w-fit">
                            <button type="submit" className="bg-black rounded-xl px-5 py-2 font-roboto">Withdraw</button>
                        </div>
                    </form>
                </div>

            </div>


            <div className="absolute bottom-10 w-full">

                {
                    withdraw_data?.status &&

                    <div className="w-full mt-5">
                        <p className="font-roboto text-xl uppercase text-center text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text">status</p>
                        <div className="flex justify-between items-center w-[90%] mx-auto mt-2">
                            <div className="flex justify-center items-center flex-col">
                                <p className={`font-roboto text-xs capitalize text-center text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text ${withdraw_data?.status === 'pending' ? 'opacity-100' : 'opacity-60'}`}>Request</p>
                                {withdraw_data?.status === 'pending' &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                        <path d="M8.7026 9.674C8.7126 9.662 8.7166 9.646 8.7266 9.634L15.7086 1.92C16.0986 1.486 16.0986 0.782 15.7086 0.348C15.7046 0.344 15.7006 0.342 15.6966 0.34C15.6098 0.234911 15.5012 0.150037 15.3782 0.0913105C15.2552 0.032584 15.1209 0.00142139 14.9846 0H1.0186C0.879825 0.00224243 0.743234 0.0349295 0.618477 0.0957527C0.49372 0.156576 0.383841 0.244052 0.2966 0.352L0.292601 0.348C0.103861 0.566371 0 0.845367 0 1.134C0 1.42263 0.103861 1.70163 0.292601 1.92L7.2906 9.674C7.37772 9.77612 7.48596 9.85813 7.60784 9.91436C7.72973 9.97059 7.86237 9.99971 7.9966 9.99971C8.13083 9.99971 8.26347 9.97059 8.38536 9.91436C8.50724 9.85813 8.61548 9.77612 8.7026 9.674Z" fill="url(#paint0_linear_225_5)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_225_5" x1="1.04695e-08" y1="5.05493" x2="16.0011" y2="4.94812" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#27C9FF" />
                                                <stop offset="1" stopColor="#FBD130" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                }
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <p className={`font-roboto text-xs capitalize text-center text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text ${withdraw_data?.status === 'canceled' ? 'opacity-100' : 'opacity-60'}`}>Canceled</p>
                                {withdraw_data?.status === 'canceled' &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                        <path d="M8.7026 9.674C8.7126 9.662 8.7166 9.646 8.7266 9.634L15.7086 1.92C16.0986 1.486 16.0986 0.782 15.7086 0.348C15.7046 0.344 15.7006 0.342 15.6966 0.34C15.6098 0.234911 15.5012 0.150037 15.3782 0.0913105C15.2552 0.032584 15.1209 0.00142139 14.9846 0H1.0186C0.879825 0.00224243 0.743234 0.0349295 0.618477 0.0957527C0.49372 0.156576 0.383841 0.244052 0.2966 0.352L0.292601 0.348C0.103861 0.566371 0 0.845367 0 1.134C0 1.42263 0.103861 1.70163 0.292601 1.92L7.2906 9.674C7.37772 9.77612 7.48596 9.85813 7.60784 9.91436C7.72973 9.97059 7.86237 9.99971 7.9966 9.99971C8.13083 9.99971 8.26347 9.97059 8.38536 9.91436C8.50724 9.85813 8.61548 9.77612 8.7026 9.674Z" fill="url(#paint0_linear_225_5)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_225_5" x1="1.04695e-08" y1="5.05493" x2="16.0011" y2="4.94812" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#27C9FF" />
                                                <stop offset="1" stopColor="#FBD130" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                }
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <p className={`font-roboto text-xs capitalize text-center text-transparent bg-gradient-to-l from-[#27C9FF] to-[#FBD130] bg-clip-text ${withdraw_data?.status === '1' ? 'opacity-100' : 'opacity-40'}`}>Paid</p>
                                {withdraw_data?.status === 'paid' &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                        <path d="M8.7026 9.674C8.7126 9.662 8.7166 9.646 8.7266 9.634L15.7086 1.92C16.0986 1.486 16.0986 0.782 15.7086 0.348C15.7046 0.344 15.7006 0.342 15.6966 0.34C15.6098 0.234911 15.5012 0.150037 15.3782 0.0913105C15.2552 0.032584 15.1209 0.00142139 14.9846 0H1.0186C0.879825 0.00224243 0.743234 0.0349295 0.618477 0.0957527C0.49372 0.156576 0.383841 0.244052 0.2966 0.352L0.292601 0.348C0.103861 0.566371 0 0.845367 0 1.134C0 1.42263 0.103861 1.70163 0.292601 1.92L7.2906 9.674C7.37772 9.77612 7.48596 9.85813 7.60784 9.91436C7.72973 9.97059 7.86237 9.99971 7.9966 9.99971C8.13083 9.99971 8.26347 9.97059 8.38536 9.91436C8.50724 9.85813 8.61548 9.77612 8.7026 9.674Z" fill="url(#paint0_linear_225_5)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_225_5" x1="1.04695e-08" y1="5.05493" x2="16.0011" y2="4.94812" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#27C9FF" />
                                                <stop offset="1" stopColor="#FBD130" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                }
                            </div>
                        </div>
                        <div className="h-1 w-[90%] mx-auto bg-gradient-to-l from-[#27C9FF] to-[#FBD130] "></div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Withdraw;