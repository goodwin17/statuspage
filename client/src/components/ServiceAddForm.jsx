import { Box, Typography, TextField } from "@mui/material";
import Button from "@components/Button";

export default function ServiceAddForm() {
    async function handleSubmit() {

    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 1,
                margin: '0 auto',
            }}
        >
            <Typography
                variant="h2"
                align="center"
            >
                Login form
            </Typography>
            <TextField
                id="login"
                name="login"
                label="Login"
                autoFocus
                required
            />
            <TextField
                id="password"
                type="password"
                name="password"
                label="Password"
                required
            />
            <Button
                type="submit"
                variant="contained"
                sx={{padding: 1}}
            >
                Submit
            </Button>
        </Box>
    );
}
