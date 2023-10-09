import { getService } from "@helpers/requests";
import { defer } from "react-router-dom";

export async function loader({ params }) {
    let service = getService(params.serviceId);
    return defer({ service });
}
