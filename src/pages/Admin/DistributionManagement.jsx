import toast from 'react-hot-toast';
import { useWithdrawCancelMutation, useWithdrawListQuery, useWithdrawPaidMutation, useWithdrawRecheckMutation } from '../../rtk/api/AdminEndpoint';
import { useState } from 'react';
import ExportToExcel from '../../components/ui/ExportToExcel';

const DistributionManagement = () => {
    const [tab, setTab] = useState('all');
    const { data, isFetching } = useWithdrawListQuery(tab);
    const [triggerCancelWithdraw] = useWithdrawCancelMutation();
    const [triggerRecheckWithdraw] = useWithdrawRecheckMutation();
    const [triggerWithdrawPaid] = useWithdrawPaidMutation();

    return (
        <div className='min-h-screen p-5 relative'>
            <div className="flex items-center gap-3 ">
                <div onClick={() => setTab('all')} className={`${tab === 'all' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg rounded-b-none cursor-pointer`}>
                    {
                        tab === 'all' ?
                            <p className='text-black'>All</p> :
                            <p className='text-white'>All</p>
                    }
                </div>
                <div onClick={() => setTab('pending')} className={`${tab === 'pending' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg rounded-b-none cursor-pointer`}>
                    {
                        tab === 'pending' ?
                            <p className='text-black'>Pending</p> :
                            <p className='text-white'>Pending</p>
                    }
                </div>
                <div onClick={() => setTab('paid')} className={`${tab === 'paid' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg rounded-b-none cursor-pointer`}>
                    {
                        tab === 'paid' ?
                            <p className='text-black'>Paid</p> :
                            <p className='text-white'>Paid</p>
                    }
                </div>
                <div onClick={() => setTab('canceled')} className={`${tab === 'canceled' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg rounded-b-none cursor-pointer`}>
                    {
                        tab === 'canceled' ?
                            <p className='text-black'>Canceled</p> :
                            <p className='text-white'>Canceled</p>
                    }
                </div>
            </div>
            <div className="overflow-x-auto ">
                {
                    isFetching === true ?
                        <div className=" flex justify-center items-center min-h-screen">
                            <span className="loading loading-dots loading-lg"></span>
                        </div> :
                        <table className="table text-center ">
                            <thead className='text-2xl'>
                                <tr className="text-white bg-[#FFFFFF0D]">
                                    <th className="">User</th>
                                    <th className="border border-[#27c9ff34] border-t-0">Amount</th>
                                    <th className="border border-[#27c9ff34] border-t-0">Wallet Address</th>
                                    <th className="">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.map((item, key) => <tr key={key} className="">
                                        <td className="border border-[#27c9ff34] border-l-0">@{item?._userId.username}</td>
                                        <td className="border border-[#27c9ff34]">{item?.amount}</td>
                                        <td className="border border-[#27c9ff34] border-r-0 flex justify-center items-center gap-3">
                                            {item?.address}
                                            <div onClick={() => {
                                                toast.success('Address Copyed!');
                                                navigator.clipboard.writeText(item?.address);
                                            }}
                                            ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <rect width="30" height="30" rx="5" fill="white" fillOpacity="0.1" />
                                                    <path d="M18.1818 7H9.45455C8.65091 7 8 7.65091 8 8.45455V18.6364H9.45455V8.45455H18.1818V7ZM20.3636 9.90909H12.3636C11.56 9.90909 10.9091 10.56 10.9091 11.3636V21.5455C10.9091 22.3491 11.56 23 12.3636 23H20.3636C21.1673 23 21.8182 22.3491 21.8182 21.5455V11.3636C21.8182 10.56 21.1673 9.90909 20.3636 9.90909ZM20.3636 21.5455H12.3636V11.3636H20.3636V21.5455Z" fill="white" />
                                                </svg></div>
                                        </td>
                                        <td className="border border-[#27c9ff34] border-r-0 ">
                                            {
                                                item?.status === 'pending' ? <div className="">
                                                    <button className='border rounded-md border-red-500 mr-3 px-5 py-1 text-white font-roboto text-sm' onClick={() => triggerCancelWithdraw(item?._id)}>Cancel</button>
                                                    <button onClick={() => triggerWithdrawPaid(item?._id)} className='border rounded-md border-green-500 px-5 py-1 text-white font-roboto text-sm'>Paid</button>
                                                </div> :
                                                    item?.status === 'canceled' && tab === 'canceled' ?
                                                        <div className="">
                                                            {
                                                                item?.point >= item?.amount ?
                                                                    <button className='border rounded-md border-red-500 mr-3 px-5 py-1 text-white font-roboto text-sm hover:bg-red-500 hover:text-black' onClick={() => {
                                                                        triggerRecheckWithdraw(item?._id);

                                                                    }}>Recheck</button> :
                                                                    <p>Status: {item?.status === 'paid' ? 'Paid' : item?.status === 'canceled' && 'Rejected'}</p>
                                                            }
                                                        </div> :
                                                        <p>Status: {item?.status === 'paid' ? 'Paid' : item?.status === 'canceled' && 'Rejected'}</p>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                }
            </div>
            {
                tab === 'pending' &&
                <div className="absolute bottom-5 right-5 z-50">
                    <ExportToExcel data={data?.data} />
                </div>
            }
        </div>
    );
};

export default DistributionManagement;