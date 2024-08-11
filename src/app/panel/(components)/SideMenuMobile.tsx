import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import React from "react";
import {bottomNavs, mainNavs} from "@/data/navigations";
import {classNames} from "@/utils";

const SideMenuMobile = ({logout, currentNav}: {logout: ()=>void, currentNav: string|null})=> {
    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {mainNavs.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={classNames(
                                        item.href === currentNav
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                    )}
                                >
                                    <item.icon
                                        aria-hidden="true"
                                        className={classNames(
                                            item.href === currentNav ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0',
                                        )}
                                    />
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className="mt-auto">
                    <span
                        onClick={logout}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer"
                    >
                        <LogoutIcon aria-hidden="true" className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"/>
                        Logout
                    </span>
                </li>
            </ul>
        </nav>
    )
}
export default SideMenuMobile;