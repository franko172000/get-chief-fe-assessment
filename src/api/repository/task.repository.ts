import {Axios} from "axios";
import {IUser} from "@/types/user/IUser";
import {ApiResponseShape} from "@/api";

export class TaskApi {
    constructor(private fetcher: Axios) {}

    create = async ({email, password, companyName, lastName, firstName}:{email: string, password: string, firstName: string, lastName: string, companyName: string}): Promise<IUser> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<IUser>>("tasks", { email, password, companyName, lastName, firstName });
        return response.data.data;
    };

    list = async ():Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.get<ApiResponseShape<string>>("tasks");
        return response.data.message;
    };

    assign = async ({email}:{email: string}):Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<string>>("user/resend-verification-email", { email });
        return response.data.message;
    };

    unassign = async ():Promise<IUser | null> => {
        const response = await this.fetcher.get<ApiResponseShape<IUser>>("user/me");
        return response.data.data;
    };
}
