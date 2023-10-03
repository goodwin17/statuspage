import { useTheme } from "@mui/material/styles";
import { Container, Paper } from "@mui/material";

export default function Footer() {
    const theme = useTheme();

    return (
        <Paper
            component="footer"
            square
            sx={{
                color: 'white',
                backgroundColor: theme.palette.primary.main
            }}
        >
            <Container sx={{padding: '1rem', fontSize: '1.2rem'}}>
                Footer info
            </Container>
        </Paper>
    );
}
