import {FormHelperText, Stack, TextFieldProps} from "@mui/material";
import {Control, useController} from "react-hook-form";
import React, {FC} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";

interface Props extends Omit<TextFieldProps<"standard">, "variant"> {
    name: string;
    control?: Control<any, any>;
    label?: string;
    hint?: string;
    format?: (value: string) => string;
    errorMessage?:string;
}

const DatePickerField: FC<Props> = ({options, control, label, name, placeholder, errorMessage, ...props  }) => {
    let controlProps: any = {};
    if(control){
        controlProps = useController({ name, control });
    }
    const handleInputChange = (value: any) => {
        controlProps?.field.onChange(value);
    };

    return (

            <div className="w-full my-5">
                {label && (
                    <Stack direction='row' spacing={2} mb={1}>
                        <p>{label}</p>
                    </Stack>
                )}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        {...controlProps?.field}
                        defaultValue={dayjs('2022-04-17')}
                        onChange={handleInputChange}
                        error={!!errorMessage}
                        {...props}
                        placeholder={placeholder}
                    />
                </LocalizationProvider>
                <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
            </div>


    )
}
export default DatePickerField;