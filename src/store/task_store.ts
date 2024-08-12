import {create} from "zustand";
import {appApi} from "@/api";
import {ITask} from "@/types/task";
import {IUser} from "@/types/user/IUser";

type TaskStateType = {
    task: ITask
    tasks: ITask[]
    error: any
}

const taskState: TaskStateType = {
    task: {
        title: '',
        id: 0,
        assigned_date: '',
        status: '',
        due_date: '',
        priority: '',
        owner: null,
        created_at: '',
        description: ''
    },
    tasks: [],
    error: null
}

type TaskAction = {
    getTask: (taskId: number,onSuccess?: ()=> void)=> void;
    createTask: ({task, onError, onSuccess}:{task: ITask, onSuccess?: (data?: ITask) => void, onError?: (err?: any) => void
})=> void;
    getTasks: (onSuccess?: ()=> void)=> void;
    setTask: (task: ITask | null)=>void;
    setTasks: (tasks: ITask[])=>void;
}

export const useTasks = create<TaskStateType & TaskAction>((set, getState) => ({
    ...taskState,
    getTasks: async (onSuccess) => {
        try{
            const tasks = await appApi.task.list()
            if(tasks){
                onSuccess?.()
                set(()=> ({
                    tasks
                }))
            }
        }catch (err){
            set(()=> ({
                error: err
            }))
        }
    },
    createTask: async ({task, onSuccess, onError}) => {
        try{
            const newTask = await appApi.task.create(task)
            if(newTask){
                onSuccess?.()
                console.log(taskState.tasks)
                set(()=> ({
                    task: newTask,
                    tasks: [...getState().tasks, newTask]
                }))
            }
        }catch (err){
            onError?.(err)
            set(()=> ({
                error: err
            }))
        }
    },
    getTask: async (taskId: number, onSuccess) => {
        try{
            const task = await appApi.task.task(taskId)
            if(task){
                onSuccess?.()
                set(()=> ({
                    task
                }))
            }
        }catch (err){
            set(()=> ({
                error: err
            }))
        }
    },
}))