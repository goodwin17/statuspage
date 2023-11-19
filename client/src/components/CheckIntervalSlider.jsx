import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useState } from "react";

export default function CheckIntervalSlider({ defaultValue }) {
    const [checkInterval, setCheckInterval] = useState(defaultValue);
    const handleCheckIntervalChange = (event, newValue) => setCheckInterval(newValue);

    return (
        <Box>
            <Typography>Check interval (in minutes)</Typography>
            <Slider
                name="checkInterval"
                min={1} max={30}
                step={1} marks
                defaultValue={checkInterval}
                valueLabelDisplay="auto"
                onChange={handleCheckIntervalChange}
            />
        </Box>
    );
}
