// import useAuth from "@hooks/useAuth";
import PageTitle from "@components/PageTitle";
import Box from "@mui/material/Box";
import DataSection from "@components/DataSection";
import { Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { getServices } from "@api/requests";
import Loaded from "@components/Loaded";

export default function AdminPage() {
    let [services, setServices] = useState(null);

    useEffect(() => {
        async function loadData() {
            let services = await getServices();
            setServices(services);
        }

        loadData();
    }, []);

    return (
        <>
            <PageTitle title='Admin Page' />
            <DataSection title='Services'>
                <Loaded resolve={services}>
                    {services => (
                        <Stack>
                            {services.map((service, i) => (
                                <Box key={service.id}>
                                    <Typography>{service.name} • {service.address}</Typography>
                                    <Typography>Checked every _ by _ method</Typography>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Loaded>
            </DataSection>
        </>
    );
}
