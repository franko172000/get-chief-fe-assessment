import React, {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
    classOverride?: string
}
const CustomBadge = ({children, classOverride}: Props)=>{
    return (
        <span className={`flex gap-5 items-center rounded-md bg-white p-3 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 hover:bg-primary hover:text-white cursor-pointer ${classOverride}`}>
            {children}
        </span>
    )
}
export default CustomBadge;