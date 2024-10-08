import React, {PropsWithChildren, useEffect, useState} from "react";
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
import {useAppUser} from "@/store/user";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import TextAreaField from "@/shared/components/form/TextAreaField";

interface TaskModalProps extends PropsWithChildren{
    title?: string,
    show?: boolean,
    onClose?: (status: boolean)=>void,
    onTaskCreated?:(task?: ITask)=>void,
    onTaskUpdated?:(task?: ITask)=>void,
    task?:ITask,
}

interface TaskValues {
    title: string;
    description: string;
    due_date: string;
    owner_id: number;
    priority: string;
}

const validationSchema = object().shape({
    title: string().required(),
    description: string().required(),
    due_date: string(),
    owner_id: number(),
    priority: string().required(),
});
export default function CreateTaskModal({show = false, onClose, onTaskCreated, onTaskUpdated, task} : TaskModalProps) {
    //const {task} = useTasks()
    const {createTask, updateTask} = useTasks()
    const {users, getUsers} = useAppUser()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState, reset, setValue } = useForm<TaskValues>({
        defaultValues: {
            title: '',
            description: '',
            due_date: '',
            owner_id: 0,
            priority: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const handleTaskSubmit = async (data) => {
        await createTask({
            task: {
                title: data.title,
                description: data.description,
                due_date: data.due_date,
                owner_id: data.owner_id ?? undefined,
                priority: data.priority,
            } as ITask,
            onSuccess: (task)=>{
                toast.success('Task created');
                setIsLoading(false);
                reset()
                onTaskCreated?.(task)
            },
            onError: (err)=>{
                toast.error('Error creating task');
                setIsLoading(false);
            }
        })
    }

    const handleTaskUpdate = async (data) => {
        await updateTask({
            task: {
                id: task?.id,
                title: data.title,
                description: data.description,
                due_date: data.due_date,
                owner_id: data.owner_id,
                priority: data.priority,
            } as ITask,
            onSuccess: (task)=>{
                toast.success('Task Updated');
                setIsLoading(false);
                reset()
                onTaskUpdated?.(task)
            },
            onError: (err)=>{
                toast.error('Error updating task');
                setIsLoading(false);
            }
        })
    }

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        if(task){
            handleTaskUpdate(data)
        }else{
            await handleTaskSubmit(data);
        }
    });
    useEffect(() => {
        getUsers()
        setValue('title', task?.title)
        setValue('description', task?.description)
        setValue('due_date', task?.due_date)
        setValue('owner_id', task?.owner?.id)
        setValue('priority', task?.priority)
    }, [task]);
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppModal show={show} onClose={onClose} title={task ? 'Edit Task' : 'Create Task'}>
                <div className="w-[550px]">
                    <form onSubmit={onSubmit}>
                        <TextInputField
                            placeholder="Enter title"
                            name="title"
                            label="Title"
                            type="text"
                            defaultValue={task?.title}
                            control={control}
                            errorMessage={formState.errors["title"]?.message}
                        />
                        <TextAreaField
                            placeholder="Enter description"
                            name="description"
                            label="Description"
                            type="text"
                            control={control}
                            errorMessage={formState.errors["description"]?.message}
                        />

                        <SelectField
                            placeholder="Select Team Member"
                            name="owner_id"
                            label="Assign Team Member"
                            errorMessage={formState.errors["owner_id"]?.message}
                            options={users.map(user => ({
                                key: user.id,
                                value: `${user.first_name} ${user.last_name}`
                            }))}
                            control={control}
                        />
                        <TextInputField
                            placeholder="Select Due Date"
                            name="due_date"
                            label="Due Date"
                            type="date"
                            control={control}
                            errorMessage={formState.errors["due_date"]?.message}
                        />

                        <SelectField
                            placeholder="Select Pirority"
                            name="priority"
                            label="Priority"
                            errorMessage={formState.errors["priority"]?.message}
                            options={[
                                {
                                    key: 'high',
                                    value: 'High'
                                },
                                {
                                    key: 'medium',
                                    value: 'Medium'
                                },
                                {
                                    key: 'low',
                                    value: 'Low'
                                },
                            ]}
                            control={control}
                        />

                        <div className="w-full mt-12">
                            <ButtonCustom text={task ? 'Update Task' : 'Create Task'} isLoading={isLoading}/>
                        </div>
                    </form>
                </div>
            </AppModal>
        </LocalizationProvider>
    )
}
