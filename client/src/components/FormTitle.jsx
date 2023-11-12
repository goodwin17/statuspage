import Typography from "@mui/material/Typography";

export default function FormTitle({ children }) {
    return (
        <Typography
            variant="h2"
            align="center"
        >
            {children}
        </Typography>
    );
}
