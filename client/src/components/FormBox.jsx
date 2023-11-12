import Box from "@mui/material/Box";
import FormTitle from "@components/FormTitle";
import FormButton from "@components/FormButton";

export default function FormBox({ title, onSubmit, children, buttonText = 'Submit' }) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                width: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 1,
                margin: '0 auto'
            }}
        >
            <FormTitle>{title}</FormTitle>
            {children}
            <FormButton>{buttonText}</FormButton>
        </Box>
    );
}
