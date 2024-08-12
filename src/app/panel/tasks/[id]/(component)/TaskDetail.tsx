import {useTasks} from "@/store/task_store";
import AssignTaskModal from "@/app/panel/tasks/[id]/(component)/AssignTaskModal";
import React, {useEffect, useState} from "react";
import {ITask} from "@/types/task";
import {CircularProgress} from "@mui/material";
import {useAppNavigation} from "@/store/navigation";
import CreateTaskModal from "@/app/panel/tasks/(components)/CreateTaskModal";

const TaskDetail = () => {
    const {task, unAssignTask} = useTasks()
    const {setCurrentNav} = useAppNavigation();
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editTaskData, setEditTaskData] = useState<ITask>(null);
    const handleTaskAssigned = (task: ITask) => {
        setShowModal(false)
    }

    const handleTaskUpdated = (task: ITask) => {
        setShowEditModal(false)
        setEditTaskData(task)
    }

    const removeAssignment = async () => {
        setIsLoading(true)
        await unAssignTask({
            taskId: task.id as number,
            onSuccess: ()=> {
                setIsLoading(false)
            },
            onError: ()=> {
                setIsLoading(false)
            }
        })
    }

    useEffect(()=>{
        setCurrentNav('tasks')
    },[])
    return (
        <div className="block">
            <h3 className="text-base font-semibold leading-6 text-gray-900 my-5">{task.title}</h3>
            <div className="flex gap-2">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow w-full">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Task Description</h3>
                            </div>
                            <div className="ml-4 mt-4 flex-shrink-0">
                                <button
                                    onClick={()=>setShowEditModal(true)}
                                    type="button"
                                    className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Edit Task
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">{task.description}</div>
                    <div className="px-4 py-4 sm:px-6 flex justify-between">
                        <div>
                            <p className="font-bold">Assigned To:</p>
                            <span>{task?.owner ? `${task?.owner?.first_name} ${task?.owner?.last_name}` : 'uanssigned'}</span>
                        </div>
                        <div>
                            <p className="font-bold">Assigned Date:</p>
                            <span>{task?.assigned_date}</span>
                        </div>
                        <div>
                            <p className="font-bold">Due Date:</p>
                            <span>{task?.due_date}</span>
                        </div>
                        <div>
                            <p className="font-bold">Status:</p>
                            <span>{task?.status}</span>
                        </div>
                        {
                            !task?.owner ? (
                                <div>
                                    <button
                                        type="button"
                                        onClick={()=> setShowModal(true)}
                                        className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Assign to team member
                                    </button>
                                </div>
                            ): (
                                <div>
                                    <button
                                        type="button"
                                        onClick={removeAssignment}
                                        className="relative inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {isLoading ? <CircularProgress size={20} /> : 'Remove assignment'}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <CreateTaskModal show={showEditModal} onClose={(status)=>setShowEditModal(status)} task={task} onTaskUpdated={handleTaskUpdated} />
            <AssignTaskModal show={showModal} taskId={task.id as number} onTaskAssigned={handleTaskAssigned} onClose={(status)=>setShowModal(status)} />
        </div>
    )
}
export default TaskDetail