import { List, ListItem, ListItemText, Typography } from "@mui/material";
import IncidentListItemIcon from '@components/IncidentListItemIcon';

export default function IncidentList({ incidents }) {
    // incidents = [{
    //     id,
    //     type,
    //     title,
    //     reason,
    //     code?
    //     datetime
    // }, ...];

    // incident types: up, down, stopped, started

    return (
        <List>
            {incidents.map(incident => (
                <ListItem key={incident.id} >
                    <IncidentListItemIcon iconType={incident.type} />
                    <ListItemText
                        primary={incident.title}
                        secondary={incident.datetime}
                    />
                </ListItem>
            ))}
        </List>
    );
}
