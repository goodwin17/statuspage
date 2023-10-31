import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@components/Button";
import useAuth from "@hooks/useAuth";
import { editUser } from "@api/requests";

export default function EditAccountForm() {
    let { user } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const accountData = {
            name: formData.get('name'),
            login: formData.get('login'),
            password: formData.get('password')
        };
        const editSuccess = editUser(user.login, accountData);
        console.log(editSuccess);
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
                Edit account
            </Typography>
            <TextField
                id="name"
                name="name"
                label="name"
                value={user.name}
                autoFocus
                required
            />
            <TextField
                id="login"
                name="login"
                label="Login"
                value={user.login}
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
                sx={{
                    fontSize: '1.1rem'
                }}
            >
                Submit
            </Button>
        </Box>
    );
}
