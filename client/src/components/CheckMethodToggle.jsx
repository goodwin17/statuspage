import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material";
import { useState } from "react";
import FormTextField from "@components/FormTextField";

const CheckMethodToggleButton = styled(ToggleButton)({
    paddingLeft: 1.75,
    paddingRight: 1.75,
    paddingTop: 1,
    paddingBottom: 1
});

export default function CheckMethodToggle({ defaultValue }) {
    const [checkMethod, setCheckMethod] = useState(defaultValue);
    const handleCheckMethodChange = (event, newValue) => (newValue !== null) && setCheckMethod(newValue);

    return (
        <Box
            display={'flex'} flexDirection={'row'}
            alignItems={'center'} gap={2}
        >
            <Typography>Check method</Typography>
                <ToggleButtonGroup
                    value={checkMethod} exclusive
                    onChange={handleCheckMethodChange}
                >
                    <CheckMethodToggleButton value="HTTP">HTTP</CheckMethodToggleButton>
                    <CheckMethodToggleButton value="ICMP">ICMP</CheckMethodToggleButton>
                </ToggleButtonGroup>
                <FormTextField
                    spec="checkMethod" value={checkMethod}
                    type="hidden"
                />
        </Box>
    );
}
