import {ITask} from "@/types/task";

export interface IUser {
    id: number,
    email: string,
    first_name?: boolean,
    last_name?: string,
    created_at?: string,
    task_count?: number,
}

export interface ICreateUser {
    email: string,
    first_name: boolean,
    last_name: string,
    password: string,
}