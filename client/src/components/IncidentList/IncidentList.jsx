import { List, ListItem, ListItemText, Typography } from "@mui/material";
import IncidentListItemIcon from '@components/IncidentListItemIcon';

export default function IncidentList({ incidents }) {
    return (
        <List>
            {incidents.map(incident => (
                <ListItem key={incident.id} >
                    <IncidentListItemIcon incidentTitle={incident.title} />
                    <ListItemText
                        primary={incident.title}
                        secondary={(
                            <>
                                <Typography>{incident.reason}</Typography>
                                <Typography>{incident.datetime}</Typography>
                            </>
                        )}
                    />
                </ListItem>
            ))}
        </List>
    );
}
