import PageTitle from "@components/PageTitle";
import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";
import { incidents, overallUptime, service, parseInterval } from "@helpers/placeholders.jsx";

function getPageSubtitle(intervalMinutes, intervalSeconds) {
    return `Being checked every${intervalMinutes ? ` ${intervalMinutes} minutes` : ""}
    ${intervalSeconds ? `${intervalMinutes ? " and" : ""} ${intervalSeconds} seconds` : ""}
     by ${service.checkMethod} method`;
}

export default function ServicePage() {
    let [intervalMinutes, intervalSeconds] = parseInterval(service.checkInterval);
    let pageSubtitle = getPageSubtitle(intervalMinutes, intervalSeconds);

    return (
        <>
            <PageTitle
                title={`${service.name} is operational`}
                subtitle={pageSubtitle}
            />
            <DataSection title="Test" details="Something">
                Test page
            </DataSection>
            <DataSection title="Recent incidents">
                <IncidentList incidents={incidents} />
            </DataSection>
            <DataSection title="Overall uptime">
                <DataStack dataItems={overallUptime} />
            </DataSection>
        </>
    );
}
