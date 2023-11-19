import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";
import CheckMethodToggle from "@components/CheckMethodToggle";
import CheckIntervalSlider from "./CheckIntervalSlider";
import { createService } from "@api/requests";

export default function AddServiceForm() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const service = {
            name: formData.get('name'),
            address: formData.get('address'),
            checkMethod: formData.get('checkMethod'),
            checkInterval: parseInt(formData.get('checkInterval')) * 60
        };
        console.log(service);
        const success = await createService(service);
        console.log(success);
        window.location.reload();
    }

    return (
        <FormBox title="Add service" onSubmit={handleSubmit}>
            <FormTextField spec="name" autoFocus required />
            <FormTextField spec="address" required />
            <CheckMethodToggle />
            <CheckIntervalSlider />
        </FormBox>
    );
}
