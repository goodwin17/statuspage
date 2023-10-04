import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from "react";

export default function IncidentListItemIcon({ incidentTitle }) {
    const getIcon = incidentTitle => {
        if (incidentTitle.includes('Running')) {
            return <ArrowCircleUpIcon sx={{minWidth: '24px', marginRight: '0.8rem'}} />;
        } else if (incidentTitle.includes('Down')) {
            return <ArrowCircleDownIcon sx={{minWidth: '24px', marginRight: '0.8rem'}} />;
        } else if (incidentTitle.includes('paused')) {
            return <PauseCircleOutlineIcon sx={{minWidth: '24px', marginRight: '0.8rem'}} />;
        } else {
            return <PlayCircleOutlineIcon sx={{minWidth: '24px', marginRight: '0.8rem'}} />;
        }
    };

    const [icon, setIcon] = useState(getIcon(incidentTitle));

    return (
        <>{icon}</>
    );
}
