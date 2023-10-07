import PageTitle from "@components/PageTitle";
import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";

const incidents = [{
    id: 1,
    type: 'up',
    title: "Running again",
    reason: "Some reason",
    datetime: "some date"
}, {
    id: 2,
    type: 'down',
    title: "Down right now",
    reason: "Some reason",
    datetime: "some date"
}];

const overallUptimeData = [{
    capture: 'Last day',
    value: '99%',
}, {
    capture: 'Last 7 days',
    value: '98.23%'
}, {
    capture: 'Last 30 days',
    value: '97.456%'
},];

const service = {
    name: 'Example website',
    address: 'https://example.com',
    checkMethod: 'http',
    checkInterval: 60,
    monitoringStatus: 1
};

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
                <DataStack dataItems={overallUptimeData} />
            </DataSection>
        </>
    );
}
