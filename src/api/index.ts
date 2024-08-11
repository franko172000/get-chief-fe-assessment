"use client"
import axios, {Axios, AxiosInstance} from "axios";
import {AuthApi} from "@/api/repository/auth.repository";
import {UserApi} from "@/api/repository/user.repository";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});

export const attachAuthToken = (token: string, fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const attachLangHeader = (lang: string, fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["x-custom-lang"] = lang;
};

export const removeAuthHeader = (fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["Authorization"] = undefined;
};

export const setRequestTokenAuthHeader = (token: string,fetcher: Axios = axiosInstance) => {
    fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export interface ApiResponseShape<T> {
    message: string
    data: T
}


class Api {
    public auth: AuthApi;
    public user: UserApi;

    constructor(axios: Axios) {
        this.auth = new AuthApi(axios);
        this.user = new UserApi(axios);
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error.response.status === 401) {
        //     if (localStorage.getItem("accessToken")) {
        //         localStorage.removeItem("accessToken");
        //         window.location.href = AuthRoutes.LOGIN_PAGE;
        //     }
        // }
        return Promise.reject(error);
    }
);
export const pendulumApi = new Api(axiosInstance);
