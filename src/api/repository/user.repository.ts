import {Axios} from "axios";
import {ICreateUser, IUser} from "@/types/user/IUser";
import {ApiResponseShape} from "@/api";

export class UserApi {
    constructor(private fetcher: Axios) {}

    create = async (data:ICreateUser): Promise<IUser> => {
        const response = await this.fetcher.post<ApiResponseShape<IUser>>("users", data);
        return response.data as IUser;
    };

    getLoggedInUser = async ():Promise<IUser | null> => {
        const response = await this.fetcher.get<ApiResponseShape<IUser>>("user/me");
        return response.data.data;
    };

    getUsers = async ():Promise<IUser[]> => {
        const response = await this.fetcher.get<IUser[]>("users");
        return response.data as IUser[];
    };
}
