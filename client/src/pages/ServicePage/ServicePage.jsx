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
import { parseInterval, calculateOverallUptime } from "@helpers/utils.jsx";

function getPageSubtitle(checkInterval, checkMethod) {
    let [intervalMinutes, intervalSeconds] = parseInterval(checkInterval);
    let subtitleString = `Being checked every `;
    
    if (intervalMinutes) {
        let s = intervalMinutes > 1 ? 's' : '';
        subtitleString += `${intervalMinutes} minute${s}`;

        if (intervalSeconds) {
            subtitleString += ' and ';
        }
    }
    
    if (intervalSeconds) {
        let s = intervalSeconds > 1 ? 's' : '';
        subtitleString += `${intervalSeconds} second${s}`;
    }

    let subtitle = (
        <Typography>
            {subtitleString} by <strong>{checkMethod.toUpperCase()}</strong> method
        </Typography>
    );

    return subtitle;
}

export default function ServicePage() {
    let loaderData = useLoaderData();
    
    return (
        <>
            <Suspense fallback={<Skeleton />}>
                <Await resolve={loaderData.service}>
                    {(service) => (
                        <PageTitle
                            title={`${service.name} is operational`}
                            subtitle={getPageSubtitle(service.checkInterval, service.checkMethod)}
                        />
                    )}
                </Await>
            </Suspense>
            <DataSection title="Uptime" details="60 days">
                <Suspense fallback={<Skeleton height={10} />}>
                    <Await resolve={loaderData.uptimeData}>
                        {(uptimeData) => (
                            <>
                                <Typography
                                    fontSize={'1.2rem'}
                                    marginBottom={1}
                                >
                                    {'Average: '}
                                    {uptimeData[0] ? (
                                        <span style={{color: '#00d200', fontWeight: 500}}>
                                            {uptimeData[0].value}
                                        </span>
                                    ) : (
                                        <span>Not enough data</span>
                                    )}
                                </Typography>
                                <UptimeChart uptimeData={uptimeData} />
                            </>
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
                            <IncidentList incidents={incidents} />
                        )}
                    </Await>
                </Suspense>
            </DataSection>
        </>
    );
}
