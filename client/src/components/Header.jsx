import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@components/Button";

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
                        href="/"
                        sx={{
                            color: "white",
                            fontSize: "1.8rem"
                        }}
                    >
                        Status Page
                    </Button>
                    <Button
                        href="/login"
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
