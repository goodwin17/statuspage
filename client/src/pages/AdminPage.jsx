import DataSection from "@components/DataSection";
import Link from "@components/Link";
import Loaded from "@components/Loaded";
import PageTitle from "@components/PageTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Divider from '@mui/material/Divider';
import AddServiceForm from "@components/AddServiceForm";
import AddAdminForm from "@components/AddAdminForm";
import useAuth from "@hooks/useAuth";
import { useState, useEffect } from "react";
import { getServices, getAdmins } from "@api/requests";
import { getCheckDescription } from "@helpers/utils";

export default function AdminPage() {
    const { user } = useAuth();
    const [services, setServices] = useState(null);
    const [admins, setAdmins] = useState(null);
    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const openAddServiceModal = () => setIsAddServiceModalOpen(true);
    const closeAddServiceModal = () => setIsAddServiceModalOpen(false);
    const openAddAdminModal = () => setIsAddAdminModalOpen(true);
    const closeAddAdminModal = () => setIsAddAdminModalOpen(false);

    useEffect(() => {
        async function loadData() {
            let services = await getServices();
            setServices(services);
            let admins = await getAdmins();
            setAdmins(admins);
        }

        loadData();
    }, []);

    if (user === null) {
        return <>Loading...</>;
    }

    return (
        <>
            <Modal
                open={isAddServiceModalOpen}
                onClose={closeAddServiceModal}
            >
                <AddServiceForm />
            </Modal>
            <Modal
                open={isAddAdminModalOpen}
                onClose={closeAddAdminModal}
            >
                <AddAdminForm />
            </Modal>
            <PageTitle title='Admin Panel' />
            <DataSection title='Services'>
                <Loaded resolve={services}>
                    {services => (
                        <>
                            {services.length > 0 ? (
                                <Stack gap={2}>
                                    {services.map(service => (
                                        <Box key={service.id}>
                                            <Typography>
                                                <Link href={`/services/${service.id}`}>
                                                    {service.name}
                                                </Link>
                                                {' • '}
                                                {service.address}
                                            </Typography>
                                            <Typography marginTop={0.25}>
                                                {getCheckDescription(service.checkInterval, service.checkMethod)}
                                            </Typography>
                                            <Divider sx={{marginTop: 1}} />
                                        </Box>
                                    ))}
                                </Stack>
                            ) : <Typography>No services</Typography>}
                            <Button
                                onClick={openAddServiceModal}
                                variant='contained'
                                sx={{
                                    marginTop: 2
                                }}
                            >
                                Add service
                            </Button>
                        </>
                    )}
                </Loaded>
            </DataSection>
            <DataSection title='Admins'>
                <Loaded resolve={admins}>
                    {admins => (
                        <>
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
                            <Button onClick={openAddAdminModal} variant='contained'>Add admin</Button>
                        </>
                    )}
                </Loaded>
            </DataSection>
        </>
    );
}
