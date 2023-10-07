import PageTitle from "@components/PageTitle";
import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";
import { incidents, overallUptime, service } from "./helpers/placeholders.jsx";

export default function ServicePage() {
    return (
        <>
            <PageTitle
                title={`${service.name} is operational`}
                details={`
                    Being checked every ${service.checkInterval} minutes
                    by ${service.checkMethod.toUpperCase()} method
                `}
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
