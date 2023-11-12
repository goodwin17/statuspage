import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@components/Button";
import useAuth from "@hooks/useAuth";
import useModal from "@hooks/useModal";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { isAuth, logout } = useAuth();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", {
            state: {
                from: location.pathname,
                didLogout: true
            }
        });
    }

    if (isAuth === null) {
        return <>Loading...</>;
    }

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
                    { isAuth ? (
                        <>
                            <Button
                                href="/admin"
                                sx={{
                                    color: "white",
                                    fontSize: "1rem",
                                    marginLeft: 'auto',
                                    marginRight: 2
                                }}
                            >
                                Admin Panel
                            </Button>
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: "white",
                                    fontSize: "1rem"
                                }}
                            >
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={openModal}
                                sx={{
                                    color: "white",
                                    fontSize: "1rem"
                                }}
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
