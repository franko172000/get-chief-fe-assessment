"use client"
import axios, {Axios, AxiosInstance} from "axios";
import {AuthApi} from "@/api/repository/auth.repository";
import {UserApi} from "@/api/repository/user.repository";
import {TaskApi} from "@/api/repository/task.repository";
import {AuthRoutes} from "@/shared/const/routes";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});

export const attachAuthToken = (token: string, fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const attachCallerHeader = (page: string, fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["x-caller"] = page;
};
export interface ApiResponseShape<T> {
    message: string
    data: T
}


class Api {
    public auth: AuthApi;
    public user: UserApi;
    public task: TaskApi;

    constructor(axios: Axios) {
        this.auth = new AuthApi(axios);
        this.user = new UserApi(axios);
        this.task = new TaskApi(axios);
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        if (error.response.status === 401) {
            if (error.config.url !== 'auth/login') {
                localStorage.removeItem("accessToken");
                window.location.href = AuthRoutes.LOGIN_PAGE;
            }
        }
        return Promise.reject(error);
    }

);
export const appApi = new Api(axiosInstance);
