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

    list = async ():Promise<ITask[]> => {
        const response = await this.fetcher.get<ITask[]>("tasks");
        return response.data as ITask[];
    };

    task = async (taskId: number):Promise<ITask> => {
        const response = await this.fetcher.get<ITask>(`tasks/${taskId}`);
        return response.data as ITask;
    };

    assign = async ({email}:{email: string}):Promise<ITask> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<ITask>>("user/resend-verification-email", { email });
        return response.data.message;
    };

    unassign = async ():Promise<IUser | null> => {
        const response = await this.fetcher.get<ApiResponseShape<IUser>>("user/me");
        return response.data.data;
    };
}
