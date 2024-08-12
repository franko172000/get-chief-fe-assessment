'use client'
import React, {FC, PropsWithChildren, useEffect, useState} from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon,} from '@heroicons/react/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Box} from "@mui/material";
import Logo from "@/shared/components/Logo";
import {attachAuthToken, appApi} from "@/api";
import {useAppUser} from "@/store/user";
import {AuthRoutes} from "@/shared/const/routes";
import {useRouter} from "next/navigation";
import {useAppNavigation} from "@/store/navigation";
import SideMenuDesktop from "@/app/panel/(components)/SideMenuDesktop";
import SideMenuMobile from "@/app/panel/(components)/SideMenuMobile";
import {userNavigation} from "@/data/navigations";

interface Props extends PropsWithChildren {}

const PanelLayout: FC<Props> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const userStore = useAppUser()
    const {currentNav} = useAppNavigation();
    //const [currentNav, setCurrentNav] = useState<string|null>('')
    const {user} = userStore;
    const router = useRouter();

    const logout = ()=> {
        localStorage.setItem("accessToken", '***');
        userStore.setUser(null);
        userStore.setLoggedIn(false);
        appApi.auth.logout().catch(err => console.log(err))
        router.push(AuthRoutes.LOGIN_PAGE)
    }

    useEffect(()=>{
        const token = localStorage.getItem("accessToken") ?? '';
        attachAuthToken(token)
       // userStore.getUser()
    },[])
    return (
        <Box>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <Logo/>
                                </div>
                                <SideMenuMobile logout={logout} currentNav={currentNav} />
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-10 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Logo/>
                        </div>
                        <SideMenuDesktop logout={logout} currentNav={currentNav} />
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)}
                                className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="relative flex flex-1">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                />
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    placeholder="Search..."
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Separator */}
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                          <span aria-hidden="true" className="ml-4 text-sm capitalize leading-6 text-gray-900">
                                            {user?.fullName}
                                          </span>
                                          <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {
                                                    item.logoutLink ? (
                                                        <span
                                                            onClick={logout}
                                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 cursor-pointer"
                                                        >
                                                            {item.name}
                                                        </span>
                                                    ): (
                                                        <a
                                                            href={item.href}
                                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )
                                                }

                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="p-5 bg-app-light-gray h-lvh">
                        <div className="pl-4 sm:pl-6 lg:pl-8">{children}</div>
                    </main>
                </div>
            </div>
        </Box>
    )
}
export default PanelLayout;
