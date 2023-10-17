import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import PageTitle from "@components/PageTitle";
import Typography from "@mui/material/Typography";
import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";
import { incidents, overallUptime } from "@helpers/placeholders.jsx";
import { parseInterval } from "@helpers/utils.jsx";

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
                <Suspense fallback={<Skeleton />}>
                    <Await resolve={loaderData.service}>
                        {(service) => (
                            <Typography>
                                Uptime chart here
                            </Typography>
                        )}
                    </Await>
                </Suspense>
            </DataSection>
            <DataSection title="Overall uptime">
                <DataStack dataItems={overallUptime} />
            </DataSection>
            <DataSection title="Recent incidents">
                <IncidentList incidents={incidents} />
            </DataSection>
        </>
    );
}
