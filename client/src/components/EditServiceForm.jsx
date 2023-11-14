import { Box, Typography, Slider, styled } from "@mui/material";
import { createService } from "@api/requests";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import FormBox from "@components/FormBox";
import FormTextField from "@components/FormTextField";

export default function EditServiceForm({ service }) {
    const [checkMethod, setCheckMethod] = useState(service.checkMethod);
    const [checkInterval, setCheckInterval] = useState(service.checkInterval);
    const handleCheckMethodChange = (event, newValue) => (newValue !== null) && setCheckMethod(newValue);
    const handleCheckIntervalChange = (event, newValue) => setCheckInterval(newValue);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const service = {
            name: formData.get('name'),
            address: formData.get('address'),
            checkMethod: checkMethod,
            checkInterval: checkInterval * 60
        };
        console.log(service);
        const success = await createService(service);
        console.log(success);
        window.location.reload();
    }

    const CheckMethodToggleButton = styled(ToggleButton)({
        paddingLeft: 1.75,
        paddingRight: 1.75,
        paddingTop: 1,
        paddingBottom: 1
    });

    return (
        <FormBox title="Add service" onSubmit={handleSubmit}>
            <FormTextField
                spec="name" value={service.name}
                autoFocus required
            />
            <FormTextField spec="address" value={service.address} required />
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={2}
            >
                <Typography>Check method</Typography>
                <ToggleButtonGroup
                    value={checkMethod} exclusive
                    onChange={handleCheckMethodChange}
                >
                    <CheckMethodToggleButton value="HTTP">
                        HTTP
                    </CheckMethodToggleButton>
                    <CheckMethodToggleButton value="ICMP">
                        ICMP
                    </CheckMethodToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography>Check interval (in minutes)</Typography>
                <Slider
                    min={1} max={30}
                    step={1} marks
                    defaultValue={checkInterval}
                    valueLabelDisplay="auto"
                    onChange={handleCheckIntervalChange}
                />
            </Box>
        </FormBox>
    );
}
