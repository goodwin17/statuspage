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
    },
    components: {
        MuiTypography: {
            variants: [{
                props: { variant: 'h1' },
                style: {
                    fontSize: '2.4rem',
                    fontWeight: 500
                }
            }, {
                props: { variant: 'h2' },
                style: {
                    fontSize: '1.8rem',
                    fontWeight: 500
                }
            }, {
                props: { variant: 'h3' },
                style: {
                    fontSize: '1.4rem',
                    fontWeight: 500
                }
            }, {
                props: { variant: 'h4' },
                style: {
                    fontSize: '1.2rem',
                    fontWeight: 500
                }
            }]
        }
    }
});

export default theme;
