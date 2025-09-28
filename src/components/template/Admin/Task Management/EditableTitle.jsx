import { useState, useRef, useEffect } from 'react';
import { useUpdateTaskMutation } from '../../../../rtk/api/AdminEndpoint';

const EditableTitle = ({ data }) => {
    const [titleFormInput, setTitleFormInput] = useState(data?.title);
    const [isNameEdit, setNameEdit] = useState(false);
    const titleRef = useRef(null);
    const [triggerUpdateTask] = useUpdateTaskMutation();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (titleRef.current && !titleRef.current.contains(event.target)) {
                setNameEdit(false);
                triggerUpdateTask({
                    _id: data?._id,
                    title: titleFormInput
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
    }, [isNameEdit, titleFormInput]); // Added titleFormInput as a dependency

    return (
        <div ref={titleRef}>
            {isNameEdit ? (
                <input
                    value={titleFormInput}
                    onChange={(e) => setTitleFormInput(e.target.value)}
                    placeholder="the link where the user should go..."
                    className="outline-none bg-transparent px-3 py-2 border-white border w-full rounded-md"
                />
            ) : (
                <p
                    onClick={() => setNameEdit(true)}
                    className="font-roboto text-xl border rounded-md px-3 py-1 border-opacity-20 text-white border-white capitalize max-w-72 line-clamp-1"
                >
                    {titleFormInput}
                </p>
            )}
        </div>
    );
};

export default EditableTitle;
