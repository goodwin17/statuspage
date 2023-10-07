import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
        <List disablePadding>
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
