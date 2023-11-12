import DataSection from "@components/DataSection";
import PageTitle from "@components/PageTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getServices, getUptime } from "@api/requests";
import Loaded from "@components/Loaded";
import useModal from "@hooks/useModal";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@components/Link";

export default function IndexPage() {
    let [services, setServices] = useState(null);
    let [uptimeDataItems, setUptimeDataItems] = useState(null);
    const { openModal } = useModal();
    let location = useLocation();
    let navigate = useNavigate();
    
    if (location.state?.from.startsWith('/admin') && !location.state?.didLogout) {
        navigate(location.pathname);
        openModal();
    }

    useEffect(() => {
        async function loadData() {
            let services = await getServices();
            setServices(services);
            let uptimeDataItems = [];
            
            for (let i = 0; i < services.length; i++) {
                let item = await getUptime(services[i].id);
                uptimeDataItems.push(item);
            }
            
            setUptimeDataItems(uptimeDataItems);
        }

        loadData();
    }, []);

    return (
        <>
            <PageTitle>
                All systems <span style={{color: "#00d300"}}>operational</span>
            </PageTitle>
            <DataSection title='Uptime' details='Last 60 days'>
                <Loaded resolve={{services, uptimeDataItems}}>
                    {({services, uptimeDataItems}) => (
                        services.length > 0 ? (
                            <Stack>
                                {services.map((service, i) => (
                                    <Stack
                                        key={service.id}
                                        direction='row'
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                    >
                                        <Link href={`/services/${service.id}`}>{service.name}</Link>
                                        <Typography>avg time</Typography>
                                        <Typography>Up</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        ) : (
                            <Typography fontSize={'1.2rem'}>
                                No services
                            </Typography>
                        )
                    )}
                </Loaded>
            </DataSection>
            {/* <DataSection title='Overall uptime'>
                {(uptimeDataItems) ? (
                    <Typography>
                        _{JSON.stringify(oneService)}_
                    </Typography>
                ) : (
                    <Skeleton height={40} />
                )}
            </DataSection> */}
        </>
    );
}
