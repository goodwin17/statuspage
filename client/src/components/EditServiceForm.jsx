import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";
import CheckMethodToggle from "@components/CheckMethodToggle";
import CheckIntervalSlider from "./CheckIntervalSlider";
import { editService } from "@api/requests";

export default function EditServiceForm({ service }) {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const serviceData = {
            name: formData.get('name'),
            address: formData.get('address'),
            checkMethod: formData.get('checkMethod'),
            checkInterval: parseInt(formData.get('checkInterval')) * 60
        };
        console.log(serviceData);
        const success = await editService(service.id, serviceData);
        console.log(success);
        window.location.reload();
    }

    return (
        <FormBox title="Add service" onSubmit={handleSubmit}>
            <FormTextField
                spec="name" value={service.name}
                autoFocus required
            />
            <FormTextField
                spec="address" value={service.address}
                required
            />
            <CheckMethodToggle />
            <CheckIntervalSlider />
        </FormBox>
    );
}
