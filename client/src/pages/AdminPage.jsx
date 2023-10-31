// import useAuth from "@hooks/useAuth";
import PageTitle from "@components/PageTitle";
import Box from "@mui/material/Box";
import DataSection from "@components/DataSection";
import { Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { getServices } from "@api/requests";
import Loaded from "@components/Loaded";
import Link from "@components/Link";
import { getCheckDescription } from "@helpers/utils";

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
                            {services.map(service => (
                                <Box key={service.id}>
                                    <Typography>
                                        <Link href={`/services/${service.id}`}>
                                            {service.name}
                                        </Link>
                                        {' • '}
                                        {service.address}
                                    </Typography>
                                    <Typography>
                                        {getCheckDescription(service.checkInterval, service.checkMethod)}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Loaded>
            </DataSection>
        </>
    );
}
