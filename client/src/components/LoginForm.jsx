import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";
import useAuth from "@hooks/useAuth";

export default function LoginForm() {
    let auth = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = {
            login: formData.get('login'),
            password: formData.get('password')
        };
        const loginSuccess = auth.login(credentials);
        console.log(loginSuccess);
    }
    
    return (
        <FormBox title="Log in as admin" onSubmit={handleSubmit}>
            <FormTextField spec="login" autoFocus required />
            <FormTextField spec="password" required />
        </FormBox>
    );
}
