import { Modal, Paper, IconButton } from "@mui/material";
import LoginForm from "@components/LoginForm";
import CloseIcon from '@mui/icons-material/Close';
import useModal from "@hooks/useModal";

export default function LoginModal() {
    const { isModalOpen, closeModal } = useModal();

    return (
        <Modal
        open={isModalOpen}
        onClose={closeModal}
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
                <IconButton onClick={closeModal} sx={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem'
                }}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </Modal>
);
}
