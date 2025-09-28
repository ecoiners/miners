import { useEffect, useRef, useState } from "react";
import EditableTitle from "./EditableTitle";
import ControlPublishStatus from "./ControlPublishStatus";
import RecuringControl from "./RecuringControl";
import RewardControl from "./RewardControl";

const TaskItemPreview = ({ data }) => {
   
    return (
        <div className="flex items-center justify-between gap-3 my-3 border-b border-[#FFFFFF26] pb-3">
            <div className="flex items-center gap-3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.50229C3.60457 4.50229 4.5 3.60686 4.5 2.50229C4.5 1.39772 3.60457 0.502289 2.5 0.502289C1.39543 0.502289 0.5 1.39772 0.5 2.50229C0.5 3.60686 1.39543 4.50229 2.5 4.50229ZM9.5 4.50229C10.6046 4.50229 11.5 3.60686 11.5 2.50229C11.5 1.39772 10.6046 0.502289 9.5 0.502289C8.39543 0.502289 7.5 1.39772 7.5 2.50229C7.5 3.60686 8.39543 4.50229 9.5 4.50229ZM4.5 9.50229C4.5 10.6069 3.60457 11.5023 2.5 11.5023C1.39543 11.5023 0.5 10.6069 0.5 9.50229C0.5 8.39772 1.39543 7.50229 2.5 7.50229C3.60457 7.50229 4.5 8.39772 4.5 9.50229ZM9.5 11.5023C10.6046 11.5023 11.5 10.6069 11.5 9.50229C11.5 8.39772 10.6046 7.50229 9.5 7.50229C8.39543 7.50229 7.5 8.39772 7.5 9.50229C7.5 10.6069 8.39543 11.5023 9.5 11.5023ZM11.5 16.5023C11.5 17.6069 10.6046 18.5023 9.5 18.5023C8.39543 18.5023 7.5 17.6069 7.5 16.5023C7.5 15.3977 8.39543 14.5023 9.5 14.5023C10.6046 14.5023 11.5 15.3977 11.5 16.5023ZM2.5 18.5023C3.60457 18.5023 4.5 17.6069 4.5 16.5023C4.5 15.3977 3.60457 14.5023 2.5 14.5023C1.39543 14.5023 0.5 15.3977 0.5 16.5023C0.5 17.6069 1.39543 18.5023 2.5 18.5023Z" fill="#999999" />
                </svg>

                <EditableTitle data={data} />
            </div>

            <div className="flex gap-3 items-center">
                <ControlPublishStatus data={data} />

                <RecuringControl data={data} />

                <RewardControl data={data}/>
            </div>
        </div>
    );
};

export default TaskItemPreview;