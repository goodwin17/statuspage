import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
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
            {incidents.map((incident, index) => (
                <>
                    {index > 0 && <Divider />}
                    <ListItem
                        key={incident.id}
                        disableGutters
                    >
                        <IncidentListItemIcon iconType={incident.type} />
                        <ListItemText
                            primary={incident.title}
                            primaryTypographyProps={{
                                fontSize: '1.2rem',
                                fontWeight: 500
                            }}
                            secondary={incident.datetime}
                            // sx={{fontWeight: 500}}
                        />
                    </ListItem>
                </>
            ))}
        </List>
    );
}
