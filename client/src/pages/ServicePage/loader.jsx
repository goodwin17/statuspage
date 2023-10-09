import { getService } from "@helpers/requests";

export async function loader() {
    let service = await getService('1');
    return service;
}
