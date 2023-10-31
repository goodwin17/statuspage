import DataSection from "@components/DataSection";
import Loaded from "@components/Loaded";
import PageTitle from "@components/PageTitle";
import useAuth from "@hooks/useAuth";
import { List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAdmins } from "@api/requests";

export default function UsersPage() {
    const { user } = useAuth();
    const [admins, setAdmins] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            let admins = await getAdmins();
            setAdmins(admins);
        }

        loadData();
    });

    return (
        <>
            <PageTitle>Admins</PageTitle>
            <DataSection>
                <Loaded resolve={admins}>
                    <List>
                        {admins.map(admin => (
                            <ListItem
                                key={admin.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    gap: '1rem'
                                }}
                            >
                                <Typography>{admin.name}</Typography>
                                <Typography>{admin.login}</Typography>
                                <Typography>{admin.role}</Typography>
                                {(user.id === admin.id) && <Typography>(You)</Typography>}
                            </ListItem>
                        ))}
                    </List>
                </Loaded>
            </DataSection>
        </>
    );
}
