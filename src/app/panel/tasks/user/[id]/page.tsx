"use client"
import TaskList from "@/app/panel/tasks/(components)/TaskList";
import TaskDetail from "@/app/panel/tasks/[id]/(component)/TaskDetail";
import {useAppUser} from "@/store/user";
import {useTasks} from "@/store/task_store";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/display-name
export default function ({params}:{params: any}) {
    const [isLoading, setIsLoading] = useState(true);
    const {getUserTasks} = useTasks()
    useEffect(()=>{
        getUserTasks({ownerId: params.id as number})
    }, []);
    return <TaskList />
}