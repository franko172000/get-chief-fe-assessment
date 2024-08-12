import React, {FC, useEffect} from "react";
import {useAppNavigation} from "@/store/navigation";

const Dashboard: FC = () => {
    const {setCurrentNav} = useAppNavigation();
    useEffect(()=>{
        setCurrentNav('dashboard')
    },[])
    return (
        <div>
            <div className="flex w-full gap-5">

            </div>
        </div>
    )
}

export default Dashboard;