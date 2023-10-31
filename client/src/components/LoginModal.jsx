import Modal from "@components/Modal";
import LoginForm from "@components/LoginForm";
import useModal from "@hooks/useModal";

export default function LoginModal() {
    const { isModalOpen, closeModal } = useModal();

    return (
        <Modal open={isModalOpen} onClose={closeModal}>
            <LoginForm />
        </Modal>
    );
}
