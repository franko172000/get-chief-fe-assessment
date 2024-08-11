"use client"
import {useAppNavigation} from "@/store/navigation";
import {useEffect} from "react";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import {PlusIcon} from "@heroicons/react/16/solid";

const people = [


    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

const TaskList = () => {
    const {setCurrentNav} = useAppNavigation();
    useEffect(()=>{
        setCurrentNav('tasks')
    },[])
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 bg-white rounded">
            <div className="flex w-full">
                <div className="sm:flex sm:items-center w-full justify-between ">
                    <div className="flex p-5">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Tasks</h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none w-52">
                        <ButtonCustom size="small">
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
                        {people.map((person) => (
                            <tr key={person.email}>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                    {person.name}
                                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.title}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{person.email}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                                <td className="relative py-4 pl-3 text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default TaskList