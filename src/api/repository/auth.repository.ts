import {Axios} from "axios";


import {attachAuthToken} from "..";
import {ILogin} from "@/types/auth_types";

export class AuthApi {
    constructor(private fetcher: Axios) {}

    login = async (email: string, password: string): Promise<ILogin> => {
        this.fetcher.defaults.headers.common["Authorization"] = undefined;
        const response = await this.fetcher.post<ILogin>("auth/login", { email, password });
        const data = response.data as ILogin
        attachAuthToken(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
        return data
    };
    logout = async () => {
        return await this.fetcher.post("/auth/logout");
    };
}
