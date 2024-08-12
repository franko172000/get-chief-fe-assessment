import React, {PropsWithChildren, useEffect, useState} from "react";
import {number, object} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import AppModal from "@/shared/components/Modal";
import ButtonCustom from "@/shared/components/form/ButtonCustom";
import {useTasks} from "@/store/task_store";
import {ITask} from "@/types/task";
import SelectField from "@/shared/components/form/SelectField";
import {useAppUser} from "@/store/user";

interface TaskModalProps extends PropsWithChildren{
    title?: string,
    show?: boolean,
    onClose?: (status: boolean)=>void,
    onTaskAssigned?:(task?: ITask)=>void,
    taskId: number,
}

interface TaskValues {
    owner_id: number;
}

const validationSchema = object().shape({
    owner_id: number(),
});
export default function AssignTaskModal({show = false, onClose, onTaskAssigned, taskId} : TaskModalProps) {
    const {task, assignTask} = useTasks()
    const {users, getUsers} = useAppUser()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState, reset } = useForm<TaskValues>({
        defaultValues: {
            owner_id: task?.owner?.id,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleTaskAssign = async (data) => {
        await assignTask({
            ownerId: data.owner_id,
            taskId: taskId,
            onSuccess: (task)=>{
                toast.success('Task assigned');
                setIsLoading(false);
                reset()
                onTaskAssigned?.(task)
            },
            onError: (err)=>{
                toast.error('Error assigning task');
                setIsLoading(false);
            }
        })
    }

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        await handleTaskAssign(data);
    });
    useEffect(() => {
        getUsers()
    }, []);
    return(
            <AppModal show={show} onClose={onClose} title="Assign Task">
                <div className="w-[550px]">
                    <form onSubmit={onSubmit}>
                        <SelectField
                            placeholder="Select Team Member"
                            name="owner_id"
                            label="Select Team Member"
                            errorMessage={formState.errors["owner_id"]?.message}
                            options={users.map(user => ({
                                key: user.id,
                                value: `${user.first_name} ${user.last_name}`
                            }))}
                            control={control}
                        />
                        <div className="w-full mt-12">
                            <ButtonCustom text="Assign Task" isLoading={isLoading}/>
                        </div>
                    </form>
                </div>
            </AppModal>
    )
}
