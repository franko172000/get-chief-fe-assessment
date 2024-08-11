import {create} from "zustand";

type NavPages = 'dashboard' | 'tasks' | 'users' | null;
type NavStateType = {
    currentNav: NavPages;
}

const navState: NavStateType = {
    currentNav: null,
}

type NavAction = {
    setCurrentNav: (nav: NavPages)=>void;
}

export const useAppNavigation = create<NavStateType & NavAction>((set) => ({
    ...navState,
    setCurrentNav: (nav: NavPages)=> set(()=>({
        currentNav: nav
    })),
}))