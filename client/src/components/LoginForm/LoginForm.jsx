import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginUser } from "@helpers/requests";

export default function LoginForm() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = {
            'login': formData.get('login'),
            'password': formData.get('password')
        };

        let loginSuccess = await loginUser(credentials);
        console.log(loginSuccess);
    }
    
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 1,
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
