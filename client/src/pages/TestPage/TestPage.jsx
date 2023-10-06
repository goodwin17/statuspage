import DataSection from "@components/DataSection";
import DataStack from "@components/DataStack";
import IncidentList from "@components/IncidentList";
import Typography from "@mui/material/Typography";

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

export default function TestPage() {
    return (
        <>
            <Typography variant="h1">This is test page</Typography>
            <DataSection title="Test" details="Something">
                Test page
            </DataSection>
            <DataSection title="Recent incidents">
                <IncidentList incidents={incidents} />
            </DataSection>
            <Typography>
                Another test
            </Typography>
            <DataSection title="Overall uptime">
                <DataStack dataItems={overallUptimeData} />
            </DataSection>
        </>
    );
}
