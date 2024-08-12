import {create} from "zustand";
import {appApi} from "@/api";
import {ITask} from "@/types/task";

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
    createTask: ({task, onError, onSuccess}:{task: ITask, onSuccess?: (data?: ITask) => void, onError?: (err?: any) => void })=> void;
    updateTask: ({task, onError, onSuccess}:{task: ITask, onSuccess?: (data?: ITask) => void, onError?: (err?: any) => void })=> void;
    assignTask: ({ownerId, onError, onSuccess, taskId}:{ownerId: number, taskId: number, onSuccess?: (data?: ITask) => void, onError?: (err?: any) => void })=> void;
    unAssignTask: ({onError, onSuccess, taskId}:{taskId: number, onSuccess?: (data?: ITask) => void, onError?: (err?: any) => void })=> void;
    getTasks: (onSuccess?: ()=> void)=> void;
    setTask: (task: ITask | null)=>void;
    setTasks: (tasks: ITask[])=>void;
    deleteTask: (tasks: ITask, onSuccess?: ()=> void)=>void;
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
    updateTask: async ({task, onSuccess, onError}) => {
        try{
            const updatedTask = await appApi.task.update(task)
            if(updatedTask){
                onSuccess?.()
                set(()=> ({
                    task: updatedTask,
                }))
            }
        }catch (err){
            onError?.(err)
            set(()=> ({
                error: err
            }))
        }
    },
    assignTask: async ({ownerId, taskId, onSuccess, onError}) => {
        try{
            const task = await appApi.task.assign({
                ownerId,
                taskId,
            })
            if(task){
                onSuccess?.()
                set(()=> ({
                    task: task,
                }))
            }
        }catch (err){
            onError?.(err)
            set(()=> ({
                error: err
            }))
        }
    },

    unAssignTask: async ({taskId, onSuccess, onError}) => {
        try{
            const task = await appApi.task.unaAssign(taskId)
            if(task){
                onSuccess?.()
                set(()=> ({
                    task: task,
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
    setTask: (task)=> {
        set(()=> ({
            task
        }))
    },
    deleteTask: async (task, onSuccess)=> {
        try{
            await appApi.task.delete(task?.id as number)
            onSuccess?.()
            set(()=> ({
                tasks: [...getState().tasks.filter(tsk => tsk.id != task?.id)]
            }))
        }catch (err){
            set(()=> ({
                error: err
            }))
        }
    }
}))