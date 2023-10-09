import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

async function getService(serviceId) {
    console.log("getService start");
    let response = await axios.get(`/services/${serviceId}`).catch((error) => console.log(error));
    console.log("getService end");

    if (response) {
        return response.data;
    }

    return null;
}

export { getService };
