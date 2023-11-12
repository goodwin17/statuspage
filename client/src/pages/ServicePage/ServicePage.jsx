import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import PageTitle from "@components/PageTitle";
import Typography from "@mui/material/Typography";
import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";
import UptimeChart from "@components/UptimeChart";
import ResponseTimeChart from "@components/ResponseTimeChart";
import { calculateOverallUptime, getCheckDescription } from "@helpers/utils.jsx";

export default function ServicePage() {
    let loaderData = useLoaderData();
    
    return (
        <>
            <Suspense fallback={<Skeleton />}>
                <Await resolve={loaderData.service}>
                    {(service) => (
                        <PageTitle
                            title={`${service.name} is operational`}
                            subtitle={
                                <Typography>
                                    {getCheckDescription(service.checkInterval, service.checkMethod)}
                                </Typography>
                            }
                        />
                    )}
                </Await>
            </Suspense>
            <DataSection title="Uptime" details="60 days">
                <Suspense fallback={<Skeleton height={10} />}>
                    <Await resolve={loaderData.uptimeData}>
                        {(uptimeData) => (
                            uptimeData[0] ? (
                                <>
                                    <Typography
                                        fontSize={'1.2rem'}
                                        marginBottom={1}
                                    >
                                        {'Average: '}
                                        <span style={{color: '#00d200', fontWeight: 500}}>
                                            {uptimeData[0].value}
                                        </span>
                                    </Typography>
                                    <UptimeChart uptimeData={uptimeData} />
                                </>
                            ) : (
                                <Typography fontSize={'1.2rem'}>
                                    Not enough data
                                </Typography>
                            )
                        )}
                    </Await>
                </Suspense>
            </DataSection>
            <DataSection title="Overall uptime">
                <Suspense fallback={<Skeleton />}>
                    <Await resolve={loaderData.uptimeData}>
                        {(uptimeData) => (
                            <DataStack dataItems={calculateOverallUptime(uptimeData)} />
                        )}
                    </Await>
                </Suspense>
            </DataSection>
            <DataSection title="Response Time">
                <Suspense fallback={<Skeleton />}>
                    <Await resolve={loaderData.responseTimeData}>
                        {(responseTimeData) => (
                            <ResponseTimeChart data={responseTimeData} />
                        )}
                    </Await>
                </Suspense>
            </DataSection>
            <DataSection title="Recent incidents">
                <Suspense fallback={<Skeleton />}>
                    <Await resolve={loaderData.incidents}>
                        {(incidents) => (
                            incidents[0] ? (
                                <IncidentList incidents={incidents} />
                            ) : (
                                <Typography fontSize={'1.2rem'}>
                                    Not enough data
                                </Typography>
                            )
                        )}
                    </Await>
                </Suspense>
            </DataSection>
        </>
    );
}
