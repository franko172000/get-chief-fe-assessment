import React, {PropsWithChildren, useState} from "react";
import TextInputField from "@/shared/components/form/TextInputField";
import {number, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import AppModal from "@/shared/components/Modal";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import {useTasks} from "@/store/task_store";
import {ITask} from "@/types/task";
import SelectField from "@/shared/components/form/SelectField";
import {ICreateUser, IUser} from "@/types/user/IUser";
import {useAppUser} from "@/store/user";

interface UserModalProps extends PropsWithChildren{
    title?: string,
    show?: boolean,
    onClose?: (status: boolean)=>void,
    onUserCreated?:(user?: IUser)=>void,
}

interface UserValues {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

const validationSchema = object().shape({
    email: string().required(),
    first_name: string().required(),
    last_name: string().required(),
    password: string().required(),
});
export default function CreateUserModal({show = false, onClose, onUserCreated} : UserModalProps) {
    const {user, create} = useAppUser()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState, reset } = useForm<UserValues>({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const handleUserSubmit = async (data: UserValues) => {
        await create({
            user: {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
            } as ICreateUser,
            onSuccess: (user)=>{
                toast.success('User created');
                setIsLoading(false);
                reset()
                onUserCreated?.(user)
            },
            onError: (err)=>{
                toast.error('Error creating user');
                setIsLoading(false);
            }
        })
    }

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        await handleUserSubmit(data);
    });
    return(
        <>
            <AppModal show={show} onClose={onClose} title="Create User">
                <div className="w-[550px]">
                    <form onSubmit={onSubmit}>
                        <TextInputField
                            placeholder="Enter First name"
                            name="first_name"
                            label="First name"
                            type="text"
                            control={control}
                            errorMessage={formState.errors["first_name"]?.message}
                        />
                        <TextInputField
                            placeholder="Enter Last name"
                            name="last_name"
                            label="Last name"
                            type="text"
                            control={control}
                            errorMessage={formState.errors["last_name"]?.message}
                        />
                        <TextInputField
                            placeholder="Enter email"
                            name="email"
                            label="Email"
                            type="email"
                            control={control}
                            errorMessage={formState.errors["email"]?.message}
                        />
                        <TextInputField
                            placeholder="Enter password"
                            name="password"
                            label="Password"
                            type="password"
                            control={control}
                            errorMessage={formState.errors["password"]?.message}
                        />
                        <div className="w-full mt-12">
                            <ButtonCustom text="Create User" isLoading={isLoading}/>
                        </div>
                    </form>
                </div>
            </AppModal>
        </>
    )
}
