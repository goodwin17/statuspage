import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@components/Button";
import { Paper, Modal } from "@mui/material";
import LoginForm from "@components/LoginForm";
import { useState } from "react";
import useAuth from "@hooks/useAuth";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

export default function Header() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleOpenModal = () => setIsOpenModal(true);
    const handleCloseModal = () => setIsOpenModal(false);
    let { isAuth, logout } = useAuth();

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
                                onClick={logout}
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
                                onClick={handleOpenModal}
                                sx={{
                                    color: "white",
                                    fontSize: "1rem"
                                }}
                            >
                                Log in
                            </Button>
                            <Modal
                                open={isOpenModal}
                                onClose={handleCloseModal}
                            >
                                <Paper sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    borderRadius: 2
                                }}>
                                    <LoginForm />
                                    <IconButton onClick={handleCloseModal} sx={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem'
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Paper>
                            </Modal>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
