import React, {FC, useState} from "react";
import TextInputField from "@/shared/components/form/TextInputField";
import {Button, CircularProgress, Stack} from "@mui/material";
import AuthLayout from "@/shared/layouts/AuthLayout";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {pendulumApi} from "@/api";
import toast from "react-hot-toast";
import {extractError} from "@/api/utils";
// import Router, {useRouter} from "next/router";
import { redirect, useRouter } from 'next/navigation'
import {IUser} from "@/types/user/IUser";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import {AuthRoutes} from "@/shared/const/routes";

interface SignupValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyName: string;
}

const validationSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
    firstName: string().required(),
    lastName: string().required(),
    companyName: string().required(),
});

const Signup: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { control, handleSubmit, formState } = useForm<SignupValues>({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            companyName: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const submit = useMutation<IUser, unknown, SignupValues>({
        mutationFn: (data: SignupValues) => pendulumApi.user.signup({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            companyName: data.companyName,
        }),
        onSuccess: (data: IUser) => {
            const userId = Buffer.from(data.id, 'utf8').toString('base64');
            const email = Buffer.from(data.email, 'utf8').toString('base64');
            router.push(`${AuthRoutes.VERIFY_EMAIL_PAGE}?u=${userId}&e=${email}`)
        },
        onError: (error: any) => {
            setIsLoading(false);
            const message = extractError(error);
            toast.error(message);
        },
    });

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        submit.mutate(data);
    });
    return <AuthLayout>
        <div>
            <div className="my-10">
                <h1 className="text-3xl font-bold">Create a new account</h1>
                <Stack>Already have an account? Sign In</Stack>
            </div>
            <div className="w-2/4">
                <form onSubmit={onSubmit}>
                    <TextInputField
                        placeholder="Enter first name"
                        name="firstName"
                        label="First name"
                        type="text"
                        control={control}
                        errorMessage={formState.errors["firstName"]?.message}
                    />
                    <TextInputField
                        placeholder="Enter last name"
                        name="lastName"
                        label="Last name"
                        type="text"
                        control={control}
                        errorMessage={formState.errors["lastName"]?.message}
                    />
                    <TextInputField
                        placeholder="Enter Organization Name"
                        name="companyName"
                        label="Organization Name"
                        type="text"
                        control={control}
                        errorMessage={formState.errors["companyName"]?.message}
                    />
                    <TextInputField
                        placeholder="Enter email address"
                        name="email"
                        label="Email"
                        type="email"
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

                    <div className="w-full mt-12">
                        <ButtonCustom text="Register Account" isLoading={isLoading}/>

                        <p className="text-center my-8">Or</p>

                        <Button
                            color='primary'
                            variant='outlined'
                            size='large'
                            type='submit'
                            fullWidth
                            sx={{boxShadow: 1}}
                            style={{border: 0, textAlign: 'left'}}
                            className="flex justify-between"
                        >
                            <span><img src="/images/icons_google.svg" alt=""/></span> <span
                            className="w-5/6 text-center">Register in with Google</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AuthLayout>
}
export default Signup;