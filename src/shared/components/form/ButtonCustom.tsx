import React, {FC, PropsWithChildren} from "react";
import {Button, CircularProgress} from "@mui/material";

interface ButtonProps extends PropsWithChildren{
    text?: string
    color?: string,
    variant?: string,
    size?: 'large' | 'small' | 'medium',
    isLoading?: boolean,
    type?: 'button'|'reset' | 'submit' | undefined,
    [x:string]: any,
}
const ButtonCustom: FC<ButtonProps> = ({text, color='primary', isLoading=false, type='submit', variant='contained', size= 'large', ...rest}) => {
    return (
        <div className="w-full">
            <Button
                color='primary'
                variant='contained'
                size={size}
                type={type}
                fullWidth
                disabled={isLoading}
                {...rest}
            >
                {
                    rest?.children ? (rest?.children) : (
                        <>
                            {!isLoading && text}
                            {isLoading && <CircularProgress size={20} />}
                        </>
                    )
                }

            </Button>
        </div>
    )
}
export default ButtonCustom;