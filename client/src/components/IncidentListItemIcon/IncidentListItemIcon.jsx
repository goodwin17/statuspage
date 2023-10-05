import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from "react";

const icons = {
    'up': <ArrowCircleUpIcon />,
    'down': <ArrowCircleDownIcon />,
    'stopped': <PauseCircleOutlineIcon />,
    'started': <PlayCircleOutlineIcon />
};

export default function IncidentListItemIcon({ iconType }) {
    const [icon, setIcon] = useState(icons[iconType]);

    return (
        <ListItemIcon sx={{
            minWidth: '24px',
            marginRight: '0.8rem'
        }}>
            {icon}
        </ListItemIcon>
    );
}
