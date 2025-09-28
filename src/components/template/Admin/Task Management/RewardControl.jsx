import { useUpdateTaskMutation } from '../../../../rtk/api/AdminEndpoint';
import { useForm } from 'react-hook-form';

const RewardControl = ({ data }) => {
    const [triggerUpdateTask] = useUpdateTaskMutation();
    const {register, handleSubmit} = useForm();
    const HandleRewards = (e) => {
        triggerUpdateTask({
            _id: data?._id,
            points: e.points
        })
    };
    return (
        <div>
            <div className="dropdown dropdown-end h-fit">
                <div tabIndex={0} role="button" className="border rounded-md px-3 py-1 border-opacity-20 border-white flex gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M20 8.14324C20.1 7.64324 19.7 7.04324 19.2 7.04324L13.5 6.24324L10.9 1.04324C10.8 0.843243 10.7 0.743243 10.5 0.643243C10 0.343243 9.4 0.543243 9.1 1.04324L6.6 6.24324L0.9 7.04324C0.6 7.04324 0.4 7.14324 0.3 7.34324C-0.1 7.74324 -0.1 8.34324 0.3 8.74324L4.4 12.7432L3.4 18.4432C3.4 18.6432 3.4 18.8432 3.5 19.0432C3.8 19.5432 4.4 19.7432 4.9 19.4432L10 16.7432L15.1 19.4432C15.2 19.5432 15.4 19.5432 15.6 19.5432C15.7 19.5432 15.7 19.5432 15.8 19.5432C16.3 19.4432 16.7 18.9432 16.6 18.3432L15.6 12.6432L19.7 8.64324C19.9 8.54324 20 8.34324 20 8.14324Z" fill="url(#paint0_linear_149_827)" />
                        <defs>
                            <linearGradient id="paint0_linear_149_827" x1="20.0154" y1="9.74471" x2="-4.04487e-07" y2="10.3418" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FBD130" />
                                <stop offset="1" stopColor="#27C9FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="font-roboto text-xl text-white">{data?.points} SBP</span>
                </div>

                <ul tabIndex={0} className="dropdown-content menu rounded-t-md rounded-l-md rounded-r-md z-[1]  p-2 border bg-transparent">
                    <form onSubmit={handleSubmit(HandleRewards)} className="rounded-md font-roboto text-sm text-white font-bold flex justify-between items-center gap-3 flex-row overflow-hidden w-full">
                        <input {...register('points')} type="number" defaultValue={data?.points} className="bg-transparent outline-none text-white w-fit font-roboto py-1 px-3" placeholder="0" />
                        <button type='submit' className="border p-3 rounded-xl bg-gray-600 ">✓</button>
                    </form>
                </ul>
            </div>
        </div>
    );
};

export default RewardControl;