import { Axios } from "axios";


import {attachAuthToken, ApiResponseShape} from "..";

export class AuthApi {
    constructor(private fetcher: Axios) {}

    login = async (email: string, password: string) => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<{ data: string }>("auth/login", { email, password });
        attachAuthToken(response.data.data);
        localStorage.setItem("accessToken", response.data.data);
        return response.data;
    };

    initPasswordReset = async ({email}:{email: string}):Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ApiResponseShape<string>>("auth/forgot-password/init", { email });
        return response.data.message;
    };

    resetPassword = async ({email, resetToken, newPassword}:{email: string, resetToken: string, newPassword: string}):Promise<string> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.patch<ApiResponseShape<string>>("auth/forgot-password/finalize", { email, resetToken, newPassword });
        return response.data.message;
    };

    logout = async () => {
        return await this.fetcher.post("/auth/logout");
    };
}
