import {ICreateUser, IUser} from "@/types/user/IUser";
import {create} from "zustand";
import {appApi} from "@/api";

type UserStateType = {
    isLoggedIn: boolean,
    user: IUser | null
    users: IUser[]
}

const userState: UserStateType = {
    isLoggedIn: false,
    user: null,
    users: [],
}

type UserAction = {
    getUser: (onSuccess?: ()=> void)=> void;
    create: ({user, onSuccess, onError}:{user: ICreateUser, onSuccess?: (user?: IUser) => void,  onError?: (err?: any)=>void})=> void;
    deleteUser: ({userId, onSuccess, onError}:{userId: number, onSuccess?: () => void,  onError?: (err?: any)=>void})=> void;
    getUsers: (onSuccess?: ()=> void)=> void;
    setUser: (user: IUser | null)=>void;
    setLoggedIn: (isLoggedIn: boolean)=>void;
}

export const useAppUser = create<UserStateType & UserAction>((set, getState) => ({
    ...userState,
    getUser: async (onSuccess) => {
        try{
            const user = await appApi.user.getLoggedInUser()
            if(user){
                onSuccess?.()
                set(()=> ({
                    user,
                    isLoggedIn: true
                }))
            }
        }catch (err){
            console.log(err)
        }
    },
    getUsers: async (onSuccess) => {
        try{
            const users = await appApi.user.getUsers()
            if(users){
                onSuccess?.()
                set(()=> ({
                    users,
                }))
            }
        }catch (err){
            console.log(err)
        }
    },
    create: async ({user, onSuccess, onError}) => {
        try{
            const newUser = await appApi.user.create(user)
            if(newUser){
                onSuccess?.(newUser)
                set(()=> ({
                    user: newUser,
                    users: [...getState().users, newUser]
                }))
            }
        }catch (err){
            onError?.(err)
        }
    },
    deleteUser: async ({userId, onSuccess, onError}) => {
        try{
            const response = await appApi.user.delete(userId)
            onSuccess?.()
            set(()=> ({
                users: [...getState().users.filter(user => user.id !== userId)]
            }))
        }catch (err){
            onError?.(err)
        }
    },
    setUser: (user)=> set(()=> ({user})),
    setLoggedIn: (isLoggedIn)=> set(() => ({isLoggedIn}))
}))