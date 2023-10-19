import { getIncidents, getService, getUptime, getResponseTime } from "@api/requests";
import { defer } from "react-router-dom";

export async function loader({ params }) {
    let service = getService(params.serviceId);
    let uptimeData = getUptime(params.serviceId);
    let responseTimeData = getResponseTime(params.serviceId);
    let incidents = getIncidents(params.serviceId);
    return defer({
        service,
        uptimeData,
        responseTimeData,
        incidents
     });
}
