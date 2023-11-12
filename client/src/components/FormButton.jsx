import Button from "@components/Button";

export default function FormButton({ children }) {
    return (
        <Button
            type="submit"
            variant="contained"
            sx={{
                fontSize: '1.1rem'
            }}
        >
            {children ? children : 'Submit'}
        </Button>
    );
}
