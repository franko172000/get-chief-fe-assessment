import {IUser} from "@/types/user/IUser";

export interface ITask {
    title: string,
    id?: number,
    description: string,
    assigned_date?: string,
    status?: string,
    due_date: string,
    priority: string,
    owner?: IUser | null
    created_at?: string
}