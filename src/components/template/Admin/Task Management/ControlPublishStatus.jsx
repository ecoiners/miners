import React from 'react';
import { useUpdateTaskMutation } from '../../../../rtk/api/AdminEndpoint';

const ControlPublishStatus = ({ data }) => {
    const [triggerUpdateTask] = useUpdateTaskMutation();

    const HandleLive = () => {
        triggerUpdateTask({
            _id: data?._id,
            isPause: false
        })
    };

    const HandleDrift = () => {
        triggerUpdateTask({
            _id: data?._id,
            isPause: true
        })
    };
    return (
        <div>
            <div className="dropdown dropdown-bottom dropdown-end h-fit">
                <div tabIndex={0} role="button" className="border rounded-md px-3 border-opacity-20 border-white flex gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path d="M2 3L6 7M9 0V6M16 3L12 7M18 10H13M12 13L16 17M9 14V19M6 13L2 17M5 10H0" stroke="white" strokeWidth="2" />
                    </svg>
                    {
                        data?.isPause === true ?
                            <div className="m-1 font-roboto text-xl text-white" >Drift</div> :
                            <div className="m-1 font-roboto text-xl text-white" >Live</div>
                    }
                </div>

                <ul tabIndex={0} className="dropdown-content menu rounded-t-md rounded-l-md rounded-r-md z-[1] w-52 p-2 border bg-transparent">
                    <li className="border rounded-md font-roboto text-sm text-white font-bold" onClick={HandleLive}><a>Live</a></li>
                    <li className="border rounded-md font-roboto text-sm text-white font-bold mt-3" onClick={HandleDrift}><a>Drift</a></li>
                </ul>
            </div>

        </div>
    );
};

export default ControlPublishStatus;