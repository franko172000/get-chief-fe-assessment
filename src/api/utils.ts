import { AxiosError, type AxiosResponse } from "axios";

export const extractData = <T = any>(response: AxiosResponse): Promise<T> => {
    return response.data;
};

export const extractError = (e: unknown) => {
    if (e instanceof AxiosError) {
        if (e.response?.data?.details) {
            if (Array.isArray(e.response.data.details)) {
                return e.response.data.details.join(", ");
            } else {
                return e.response.data.details;
            }
        }
        return e.response?.data?.message;
    } else if (e instanceof Error) {
        return e.message;
    } else {
        return "Something went wrong";
    }
};
