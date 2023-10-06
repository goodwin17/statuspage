import { Divider, List, ListItem, ListItemText } from "@mui/material";
import IncidentListItemIcon from '@components/IncidentListItemIcon';
import { Fragment } from "react";

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
                <Fragment key={incident.id}>
                    {index > 0 && <Divider />}
                    <ListItem disableGutters>
                        <IncidentListItemIcon iconType={incident.type} />
                        <ListItemText
                            primary={incident.title}
                            primaryTypographyProps={{
                                fontSize: '1.2rem',
                                fontWeight: 500
                            }}
                            secondary={incident.datetime}
                        />
                    </ListItem>
                </Fragment>
            ))}
        </List>
    );
}
