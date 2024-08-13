"use client"
import {useAppNavigation} from "@/store/navigation";
import {useEffect, useState} from "react";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import {EyeIcon, PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/16/solid";
import {useTasks} from "@/store/task_store";
import CreateTaskModal from "@/app/panel/tasks/(components)/CreateTaskModal";
import Link from "next/link";
import {PanelRoutes} from "@/shared/const/routes";
import {Tooltip} from "@mui/material";
import {ITask} from "@/types/task";

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

const TaskList = () => {
    const {tasks, getTasks, deleteTask} = useTasks()
    const {setCurrentNav} = useAppNavigation();
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        setCurrentNav('tasks')
        getTasks()
    },[])
    const showCreateTaskModal = () => {
        setShowModal(true)
    }

    const handleDeleteTask = (task: ITask)=> {
        deleteTask(task)
    }
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 bg-white rounded">
            <div className="flex w-full">
                <div className="sm:flex sm:items-center w-full justify-between ">
                    <div className="flex p-5">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Tasks</h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none w-52">
                        <ButtonCustom size="small" onClick={showCreateTaskModal}>
                            <span className="flex gap-2 w-full justify-center items-center"> <PlusIcon className="h-5" /> Create Task</span>
                        </ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="mt-8 flow-root overflow-hidden">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <table className="w-full text-left">
                        <thead className="bg-white">
                        <tr>
                            <th scope="col" className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Task
                                <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                                <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                Task ID
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
                                Assigned Date
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                            </th>

                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Due Date
                            </th>

                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Priority
                            </th>

                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Assigned To
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                    <Link href={`${PanelRoutes.TASKS_PAGE}/${task.id}`}>
                                        {task.title}
                                    </Link>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{task.id}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{task.assigned_date}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{task.status}</td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    {task.due_date}
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    {task.priority}
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    {task?.owner ? `${task.owner.first_name + ' ' + task.owner.last_name}` : 'unassigned' }
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium flex gap-2">
                                    <Tooltip title="View Task">
                                        <Link href={`${PanelRoutes.TASKS_PAGE}/${task.id}`}>
                                            <EyeIcon className="w-5 text-green-500" />
                                        </Link>
                                    </Tooltip>

                                    <Tooltip title="Delete Task">
                                        <TrashIcon className="w-5 text-red-500 cursor-pointer" onClick={()=>handleDeleteTask(task)} />
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <CreateTaskModal show={showModal} onClose={(status)=>setShowModal(status)} />
                </div>
            </div>
        </div>
    )
}
export default TaskList