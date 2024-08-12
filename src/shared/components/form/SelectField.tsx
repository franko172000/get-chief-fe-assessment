import {FormHelperText, IconButton, InputAdornment, Stack, TextField, TextFieldProps} from "@mui/material";
import {Control, useController} from "react-hook-form";
import React, {FC, useState} from "react";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface SelectOptions {
    key: any,
    value: string,
}
interface Props extends Omit<TextFieldProps<"standard">, "variant"> {
    name: string;
    control?: Control<any, any>;
    label?: string;
    hint?: string;
    format?: (value: string) => string;
    errorMessage?:string;
    options: SelectOptions[]
}

const SelectField: FC<Props> = ({options, control, label, name, placeholder, errorMessage, ...props  }) => {
    let controlProps: any = {};
    if(control){
        controlProps = useController({ name, control });
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const formattedValue = props.format ? props.format(rawValue) : rawValue;
        controlProps?.field.onChange(formattedValue);
    };

    return (
        <div className="w-full my-5">
            {label && (
                <Stack direction='row' spacing={2} mb={1}>
                    <p>{label}</p>
                </Stack>
            )}
            <Select id="outlined-basic" variant="outlined" size={props?.size} className="w-full" {...controlProps?.field}
                       onChange={handleInputChange}
                       error={!!errorMessage}
                       {...props}
                       placeholder={placeholder}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.key}
                    >
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
        </div>
    )
}
export default SelectField;