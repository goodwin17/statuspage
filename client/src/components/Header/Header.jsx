import { AppBar, Container, Toolbar, Button } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    <Button
                        variant="text"
                        component="a"
                        sx={{
                            color: "white",
                            fontSize: "1.8rem"
                        }}
                    >
                        Status Page
                    </Button>
                    <Button
                        variant="text"
                        component="a"
                        sx={{
                            color: "white",
                            fontSize: "1rem"
                        }}
                    >
                        Login
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
