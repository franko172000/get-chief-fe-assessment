"use client";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from "react";
import AuthLayout from "@/shared/layouts/AuthLayout";
import {useMutation} from "@tanstack/react-query";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import TextInputField from "@/shared/components/form/TextInputField";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {extractError} from "@/api/utils";
import {ErrorCode} from "@/shared/const/error-codes";
import {appApi} from "@/api";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import Link from "next/link";
import {AuthRoutes, PanelRoutes} from "@/shared/const/routes";
import {ILogin} from "@/types/auth_types";

interface LoginValues {
    email: string;
    password: string;
}

const validationSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
});

export default function Login () {
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState } = useForm<LoginValues>({
        defaultValues: { email: "", password: "" },
        resolver: yupResolver(validationSchema),
    });

    const submit = useMutation<ILogin, unknown, LoginValues>({
        mutationFn: (data: any) => appApi.auth.login(data.email, data.password),
        onSuccess: (data: any) => {
            toast.success("Login successful!");
            window.location.href = PanelRoutes.DASHBOARD_PAGE
        },
        onError: (error: any) => {
            setIsLoading(false);
            if ((error as AxiosError).response?.status === ErrorCode.UNAUTHORIZED) {
                toast.error("Invalid email or password");
            } else {
                const message = extractError(error);
                toast.error(message);
            }
        },
    });

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        submit.mutate(data);
    });
    return (
        <AuthLayout>
            <div>
                <div className="my-10">
                    <h1 className="text-3xl font-bold ">Log in to your Account</h1>
                </div>
                <div className="w-2/4">
                    <form onSubmit={onSubmit}>
                        <TextInputField
                            placeholder="Enter email address"
                            name="email"
                            label="Email"
                            type="text"
                            control={control}
                            errorMessage={formState.errors["email"]?.message}
                        />

                        <TextInputField
                            placeholder="Enter Password"
                            name="password"
                            type="password"
                            label="Password"
                            control={control}
                            errorMessage={formState.errors["password"]?.message}
                        />

                        <div className="w-full flex justify-between my-5 items-center">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber me" />
                        </div>
                        <div className="w-full mt-20">
                            <ButtonCustom text="Login" isLoading={isLoading}/>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}