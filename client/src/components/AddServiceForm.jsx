import { Box, Typography, TextField, Slider } from "@mui/material";
import Button from "@components/Button";
import { createService } from "@api/requests";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";

export default function AddServiceForm() {
    const [checkMethod, setCheckMethod] = useState('HTTP');
    const [checkInterval, setCheckInterval] = useState(5);
    const handleCheckMethodChange = (event, newValue) => setCheckMethod(newValue);
    const handleCheckIntervalChange = (event, newValue) => setCheckInterval(newValue);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const service = {
            name: formData.get('name'),
            address: formData.get('login'),
            checkMethod: checkMethod,
            checkInterval: checkInterval
        };
        console.log(service);
        const success = await createService(service);
        console.log(success);
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
                '& > *': {color: '#ff0000'}
            }}
        >
            <Typography
                variant="h2"
                align="center"
            >
                Add Service
            </Typography>
            <TextField
                id="name"
                name="name"
                label="Name"
                autoFocus
                required
            />
            <TextField
                id="address"
                name="address"
                label="Address"
                required
            />
            <Box>
                <Typography>
                    Check Method
                </Typography>
                <ToggleButtonGroup
                    value={checkMethod}
                    exclusive
                    onChange={handleCheckMethodChange}
                    >
                    <ToggleButton value="HTTP">HTTP</ToggleButton>
                    <ToggleButton value="ICMP">ICMP</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography>
                    Check Interval
                </Typography>
                <Slider
                    min={1}
                    max={30}
                    step={1}
                    marks
                    defaultValue={checkInterval}
                    valueLabelDisplay="auto"
                    onChange={handleCheckIntervalChange}
                />
            </Box>
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
