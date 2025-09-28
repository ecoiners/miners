import EditablePoint from "../../components/template/Admin/User Management/EditableBalance";
import { useLeaderboardAdminQuery, useStatisticQuery } from "../../rtk/api/AdminEndpoint";

const UserManagement = () => {
    const { data, isFetching } = useLeaderboardAdminQuery(undefined);
    const { data: count } = useStatisticQuery(undefined);
    return (
        <div className='min-h-screen'>
            <div className="flex items-center gap-5 p-5 font-roboto text-white font-medium justify-between">
                <p>Verified User: {count?.data?.verifiy_user}</p>
                <p>Total User: {count?.data?.total_user}</p>
            </div>
            <div className="overflow-x-auto ">
                {
                    isFetching === true ?
                        <div className=" flex justify-center items-center min-h-screen">
                            <span className="loading loading-dots loading-lg"></span>
                        </div> :
                        <table className="table text-center ">
                            <thead className='text-2xl'>
                                <tr className="text-white">
                                    <th className="">Username</th>
                                    <th className="border border-[#27c9ff34] border-t-0">SBP Balance</th>
                                    <th className="">Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.map((item, key) => <tr key={key} className="">
                                        <td className="border border-[#27c9ff34] border-l-0">@{item?.userId?.username ? item?.userId?.username : item?.userId?.fullName}</td>
                                        <td className="border border-[#27c9ff34] flex justify-center items-center"><EditablePoint data={item} /></td>
                                        <td className="border border-[#27c9ff34] border-r-0">{key + 1}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default UserManagement;