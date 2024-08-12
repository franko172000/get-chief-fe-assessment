import DashboardIcon from "@/assets/icons/DashboardIcon";
import {PanelRoutes} from "@/shared/const/routes";
import {PaperAirplaneIcon, UserIcon} from "@heroicons/react/16/solid";

export const mainNavs = [
    { name: 'Dashboard', href: PanelRoutes.DASHBOARD_PAGE, slug: 'dashboard', icon: DashboardIcon },
    { name: 'Tasks', href: PanelRoutes.TASKS_PAGE, slug: 'tasks', icon: PaperAirplaneIcon },
    { name: 'Users', href: PanelRoutes.USERS_PAGE, slug: 'users', icon: UserIcon },
]
export const userNavigation = [
    { name: 'Your profile', href: '#', logoutLink: false },
    { name: 'Sign out', href: '#', logoutLink: true },
]