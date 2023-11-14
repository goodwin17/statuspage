import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";
import { editUser } from "@api/requests";

export default function EditAdminForm({ admin }) {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const accountData = {
            name: formData.get('name'),
            login: formData.get('login'),
            password: formData.get('password')
        };
        const editSuccess = editUser(admin.login, accountData);
        console.log(editSuccess);
    }
    
    return (
        <FormBox title="Edit account" onSubmit={handleSubmit}>
            <FormTextField
                spec="name" value={admin.name}
                autoFocus required
            />
            <FormTextField spec="login" value={admin.login} required />
            <FormTextField spec="password" required />
        </FormBox>
    );
}
