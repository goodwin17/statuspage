import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function LoginForm() {
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          login: data.get('login'),
          password: data.get('password'),
        });
    }
    
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 1,
            // border: '2px solid silver',
            margin: '0 auto',
        }}>
            <Typography variant="h2" align="center">
                Login form
            </Typography>
            <TextField
                id="login"
                name="login"
                label="Login"
                autoFocus
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
