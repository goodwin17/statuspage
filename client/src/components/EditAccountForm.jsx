import FormBox from "@mui/material/FormBox";
import FormTextField from "@components/FormTextField";
import useAuth from "@hooks/useAuth";
import { editUser } from "@api/requests";

export default function EditAccountForm() {
    let { isAuth, user } = useAuth();

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

    if (isAuth === null) {
        return <>Loading...</>;
    }
    
    return (
        <FormBox title="Edit account" onSubmit={handleSubmit}>
            <FormTextField
                spec="name" value={user.name}
                autoFocus required
            />
            <FormTextField spec="login" value={user.login} required />
            <FormTextField spec="password" required />
        </FormBox>
    );
}
