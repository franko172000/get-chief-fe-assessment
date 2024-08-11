import {createTheme} from "@mui/material/styles";
import merge from "lodash/merge";
import typography from "./Typography";
import { darkshadows, shadows } from "./Shadows";
import * as locales from "@mui/material/locale";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import components from "@/theme/components";

const baseMode = {
    palette: {
        mode: 'light',
    },
    shape: {
        borderRadius: 7,
    },
    shadows,
    typography: typography,
};
const themeColors = {
        name: "BLUE_THEME",
        palette: {
            primary: {
                main: "#020072",
                light: "#E6E3FF",
                dark: "#1D1D36",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#49BEFF",
                light: "#E8F7FF",
                dark: "#23afdb",
                contrastText: "#ffffff",
            },
        },
    };

const theme =  createTheme(
    merge({}, baseMode,baselightTheme, locales, themeColors,{
        direction: 'ltr',
    })
);
//theme.components = components(theme);
export default theme;