import DataSection from "@components/DataSection";
import PageTitle from "@components/PageTitle";
import UptimeChart from "@components/UptimeChart";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { uptimeData } from "@helpers/placeholders";
import ResponseTimeChart from "@components/ResponseTimeChart";

export default function TestPage() {
    let [uptimeDays, setUptimeDays] = useState(uptimeData);

    return (
        <>
            <PageTitle variant="h1">This is test page</PageTitle>
            {/* <DataSection title='Uptime'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Typography
                        color='#00d200'
                        fontSize='1.3rem'
                        marginRight={2}
                    >
                        97.254%
                    </Typography>
                    <UptimeChart height="30px" uptimeDays={uptimeDays} />
                </div>
            </DataSection> */}
            <DataSection title="Response Time" details="Last 60 days">
                <ResponseTimeChart />
            </DataSection>
        </>
    );
}
