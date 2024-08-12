import {Axios} from "axios";
import {IUser} from "@/types/user/IUser";
import {ApiResponseShape} from "@/api";
import {ITask} from "@/types/task";

export class TaskApi {
    constructor(private fetcher: Axios) {}

    create = async (task: ITask): Promise<ITask> => {
        const response = await this.fetcher.post<ApiResponseShape<ITask>>("tasks", { ...task });
        return response.data as ITask;
    };

    update = async (task: ITask): Promise<ITask> => {
        const response = await this.fetcher.put<ITask>(`tasks/${task.id}`, { ...task });
        return response.data as ITask;
    };

    list = async ():Promise<ITask[]> => {
        const response = await this.fetcher.get<ITask[]>("tasks");
        return response.data as ITask[];
    };

    task = async (taskId: number):Promise<ITask> => {
        const response = await this.fetcher.get<ITask>(`tasks/${taskId}`);
        return response.data as ITask;
    };

    assign = async ({ownerId, taskId}:{ownerId: number, taskId: number}):Promise<ITask> => {
        const response = await this.fetcher.patch<ITask>(`tasks/${taskId}/assign`, { owner_id: ownerId });
        return response.data as ITask;
    };

    unaAssign = async (taskId: number):Promise<ITask> => {
        const response = await this.fetcher.patch<ITask>(`tasks/${taskId}/unassign`);
        return response.data as ITask ;
    };

    delete = async (taskId: number):Promise<any> => {
        const response = await this.fetcher.delete(`tasks/${taskId}`);
        return response.data;
    };
}
