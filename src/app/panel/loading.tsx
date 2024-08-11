import {CircularProgress} from "@mui/material";
import React from "react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="h-96 flex justify-center items-center"><CircularProgress size={20}/></div>
}