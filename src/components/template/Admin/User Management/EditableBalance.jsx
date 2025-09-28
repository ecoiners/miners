import { useState, useRef, useEffect } from 'react';
import {useUpdateUserPointMutation } from '../../../../rtk/api/AdminEndpoint';

const EditablePoint = ({ data }) => {
    const [PointFormInput, setTitleFormInput] = useState(data?.point);
    
    const [isNameEdit, setNameEdit] = useState(false);
    const titleRef = useRef(null);
    const [triggerPointUpdate] = useUpdateUserPointMutation();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (titleRef.current && !titleRef.current.contains(event.target)) {
                setNameEdit(false);
                triggerPointUpdate({
                    id: data?._id,
                    point: Number(PointFormInput)
                })
            }
        };

        if (isNameEdit) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNameEdit, PointFormInput]);

    return (
        <div ref={titleRef} className='w-full flex justify-center text-center'>
            {isNameEdit ? (
                <input
                    value={PointFormInput}
                    onChange={(e) => setTitleFormInput(e.target.value)}
                    placeholder="balance"
                    className="outline-none bg-transparent px-3 py-2 border-white border w-full rounded-md"
                />
            ) : (
                <p
                    onClick={() => setNameEdit(true)}
                    className="font-roboto text-xl rounded-md px-3 py-1 text-white text-center capitalize max-w-72 line-clamp-1"
                >
                    {PointFormInput}
                </p>
            )}
        </div>
    );
};

export default EditablePoint;
