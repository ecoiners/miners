import { useState } from "react";
import TaskItemPreview from "../../components/template/Admin/Task Management/TaskItemPreview";
import { useForm } from "react-hook-form";
import { useAddTaskMutation, useAdminTaskListQuery } from "../../rtk/api/AdminEndpoint";

const TaskManagement = () => {
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [SearchTitle, setSearchTitle] = useState("");
    const [tab, setTab] = useState("");
    const { data, isFetching } = useAdminTaskListQuery({SearchTitle, tab});

    const { register, handleSubmit, reset } = useForm();
    const [triggerAddNewTask] = useAddTaskMutation();
    const HandleAddNewTask = async (e) => {
        await triggerAddNewTask(e);
        setNewTaskModal(false);
        reset();
    }
    return (
        <div className="p-5">
            {
                newTaskModal === true &&
                <dialog id="my_modal_1" open className="modal backdrop-blur-md">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">New Task!</h3>
                        <form onSubmit={handleSubmit(HandleAddNewTask)} className="mt-5 flex flex-col gap-3">
                            <input {...register('title')} type="text" required placeholder="title of the task..." className="outline-none bg-transparent px-3 py-2 border-white border w-full rounded-md" />

                            <input {...register('link')} required placeholder="the link where the user should go..." className="outline-none bg-transparent px-3 py-2 border-white border w-full rounded-md" />


                            <label className="form-control outline-none bg-transparent px-3 py-2 border-white border w-full rounded-md">
                                <select required {...register('category')} defaultValue={'Pick one category'} className="bg-transparent outline-none ">
                                    <option value={'Pick one category'} disabled selected>Pick one category</option>
                                    <option>Telegram</option>
                                    <option>Discord</option>
                                    <option>Twitter</option>
                                    <option>CMC</option>
                                    <option>Youtube</option>
                                    <option>Linkedin</option>
                                    <option>Visit</option>
                                    <option>Comment</option>
                                    <option>Like</option>
                                    <option>Share</option>
                                    <option>Partnership</option>
                                </select>
                            </label>

                            <button type="submit" className="bg-yellow-500 py-2 text-black font-roboto font-bold rounded-md w-fit px-7">Add Task</button>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setNewTaskModal(false)}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center w-fit gap-3">
                    <div className="flex items-center gap-3 ">
                        <div onClick={() => setTab('')} className={`${tab === '' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg cursor-pointer`}>
                            {
                                tab === '' ?
                                    <p className='text-black'>All</p> :
                                    <p className='text-white'>All</p>
                            }
                        </div>
                        <div onClick={() => setTab('live')} className={`${tab === 'live' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg cursor-pointer`}>
                            {
                                tab === 'live' ?
                                    <p className='text-black'>Live</p> :
                                    <p className='text-white'>Live</p>
                            }
                        </div>
                        <div onClick={() => setTab('drift')} className={`${tab === 'drift' ? 'bg-gradient-to-r from-[#27C9FF] to-[#FBD130] text-black' : 'bg-[#FFFFFF1A] text-white'}w-fit h-fit px-5 py-1 font-roboto text-xl 
                 rounded-lg cursor-pointer`}>
                            {
                                tab === 'drift' ?
                                    <p className='text-black'>Drift</p> :
                                    <p className='text-white'>Drift</p>
                            }
                        </div>
                    </div>
                </div>

                <input type="text" value={SearchTitle} onChange={(e) => setSearchTitle(e.target.value)} placeholder="Search for task" className="font-roboto text-sm outline-none bg-transparent border rounded-md px-5 py-2 border-opacity-20 border-white" />
            </div>
            <div className="mt-5 flex flex-col gap-3">
                {
                    isFetching === true ? <div className="min-h-screen flex justify-center items-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div> :
                        <div className="">
                            {
                                data?.data?.map((item, index) => <TaskItemPreview data={item} key={index} />)
                            }
                        </div>
                }

                <div onClick={() => setNewTaskModal(true)} className="font-roboto text-xl w-fit text-white flex items-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M7.05882 0V14.1176M0 7.05882H15" stroke="#999999" strokeWidth="1.76471" />
                    </svg>
                    <p>
                        New Task
                    </p>
                </div>
            </div>

        </div >
    );
};

export default TaskManagement;