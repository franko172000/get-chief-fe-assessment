import {IUser} from "@/types/user/IUser";
import {create} from "zustand";
import {pendulumApi} from "@/api";

type UserStateType = {
    isLoggedIn: boolean,
    user: IUser | null
}

const userState: UserStateType = {
    isLoggedIn: false,
    user: null,
}

type UserAction = {
    getUser: (onSuccess?: ()=> void)=> void;
    setUser: (user: IUser | null)=>void;
    setLoggedIn: (isLoggedIn: boolean)=>void;
}

export const useAppUser = create<UserStateType & UserAction>((set) => ({
    ...userState,
    getUser: async (onSuccess) => {
        try{
            const user = await pendulumApi.user.getLoggedInUser()
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
    setUser: (user)=> set(()=> ({user})),
    setLoggedIn: (isLoggedIn)=> set(() => ({isLoggedIn}))
}))