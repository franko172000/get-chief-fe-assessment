import React, {PropsWithChildren} from "react";
import {Box, Grid, Paper} from "@mui/material";
import Logo from "@/shared/components/Logo";

interface Props extends PropsWithChildren {}
const AuthLayout = ({ children } : Props) => {
    return (
        <Box>
            <Grid container spacing={0} style={{height:'100vh'}} justifyContent='center'>
                <Grid item xs={7} sx={{py: 10, pl: 20}} >
                    <Box>
                        <div className="w-full">
                            <Logo/>
                        </div>
                        {children}
                    </Box>
                </Grid>
                <Grid item xs={5} sx={{
                    backgroundColor: "primary.main" ,
                }}>
                    <p className="text-white">Login page</p>
                </Grid>
            </Grid>
        </Box>
    )
}
export default AuthLayout;