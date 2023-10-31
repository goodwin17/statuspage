import { Modal as MuiModal, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ children, open, onClose }) {
    return (
        <MuiModal open={open} onClose={onClose}>
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
                {children}
                <IconButton onClick={onClose} sx={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem'
                }}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </MuiModal>
    );
}
