import useAuth from "@hooks/useAuth";
import PageTitle from "@components/PageTitle";
import DataSection from "@components/DataSection";
import Typography from "@mui/material/Typography";
import Button from "@components/Button";
import Modal from "@components/Modal";
import EditAccountForm from "@components/EditAccountForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminAccountPage() {
    let { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(true);

    if (!user) {
        return <Navigate to='/' state= {{from: location.pathname}} />
    }

    return (
        <>
            <Modal open={isModalOpen} onClose={closeModal}>
                <EditAccountForm />
            </Modal>
            <PageTitle>Admin Account</PageTitle>
            <DataSection sx={{
                '& > *': {fontSize: '1.3rem'}
            }}>
                <Typography>Name: {user.name}</Typography>
                <Typography>Login: {user.login}</Typography>
                <Typography>Role: {user.role}</Typography>
                <Button onClick={openModal}>Edit</Button>
            </DataSection>
        </>
    );
}
