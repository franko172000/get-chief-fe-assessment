import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import React from "react";
import {bottomNavs, mainNavs} from "@/data/navigations";
import {classNames} from "@/utils";
import Link from "next/link";

const SideMenuDesktop = ({logout, currentNav}: {logout: ()=>void, currentNav: string|null})=> {
    return (
        <nav className="flex flex-1 flex-col mt-5">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {mainNavs.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        item.slug === currentNav
                                            ? 'bg-primary text-white '
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                                        'group flex gap-x-3 rounded-md p-3 text-sm leading-6',
                                    )}
                                >
                                    <item.icon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"/>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mt-auto">
                    <span
                        onClick={logout}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm leading-6 text-orange hover:bg-gray-50 hover:text-primary flex items-center cursor-pointer"
                    >
                        <LogoutIcon aria-hidden="true" className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"/>
                        Logout
                    </span>
                </li>
            </ul>
        </nav>
    )
}
export default SideMenuDesktop;