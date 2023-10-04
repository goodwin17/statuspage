import DataSection from "@components/DataSection";
import IncidentList from "@components/IncidentList";
import { Typography } from "@mui/material";

export default function TestPage() {
    const incidents = [{
        id: 1,
        title: "Running again",
        reason: "Some reason",
        datetime: "some date"
    }, {
        id: 2,
        title: "Down right now",
        reason: "Some reason",
        datetime: "some date"
    }];
    
    return (
        <>
            <DataSection title="Test" details="Something">
                Test page
            </DataSection>
            <DataSection title="Recent incidents">
                <IncidentList incidents={incidents} />
            </DataSection>
            <Typography>
                Another test
            </Typography>
        </>
    );
}
