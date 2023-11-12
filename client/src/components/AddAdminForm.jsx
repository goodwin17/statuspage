import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";
import { createUser } from "@api/requests";

export default function AddServiceForm() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const admin = {
            name: formData.get('name'),
            login: formData.get('login'),
            password: formData.get('password'),
            role: 'admin'
        };
        console.log(admin);
        const success = await createUser(admin);
        console.log(success);
    }

    return (
        <FormBox title="Add admin" onSubmit={handleSubmit}>
            <FormTextField spec="name" autoFocus required />
            <FormTextField spec="login" required />
            <FormTextField spec="password" required />
        </FormBox>
    );
}
