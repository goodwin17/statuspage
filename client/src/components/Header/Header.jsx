import { AppBar, Container, Toolbar, Button } from "@mui/material";

export default function Header() {
    return (
        <AppBar>
            <Container>
                <Toolbar>
                    <Button
                        variant="outlined"
                        component="a"
                        sx={{ color: "white" }}
                    >
                        LOGO_PLACE
                    </Button>
                    <Button
                        variant="outlined"
                        component="a"
                        sx={{ color: "white" }}
                    >Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
