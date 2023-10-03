import { createTheme } from '@mui/material/styles';
import { indigo } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[500]
        },
        secondary: {
            main: indigo[300]
        }
    }
});

export default theme;
