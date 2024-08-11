import {Axios} from "axios";
import {IUser} from "@/types/user/IUser";
import {ApiResponseShape} from "@/api";

export class UserApi {
    constructor(private fetcher: Axios) {}

    signup = async ({email, password, companyName, lastName, firstName}:{email: string, password: string, firstName: string, lastName: string, companyName: string}): Promise<IUser> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<IUser>>("user", { email, password, companyName, lastName, firstName });
        return response.data.data;
    };

    verifyEmail = async ({code, userId}:{code: string, userId:string}):Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.patch<ApiResponseShape<string>>("user/verify-account", { code, userId });
        return response.data.message;
    };

    resendVerificationEmail = async ({email}:{email: string}):Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<string>>("user/resend-verification-email", { email });
        return response.data.message;
    };

    getLoggedInUser = async ():Promise<IUser | null> => {
        const response = await this.fetcher.get<ApiResponseShape<IUser>>("user/me");
        return response.data.data;
    };
}
