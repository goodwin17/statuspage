import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const getService = async (serviceId) => {
    let service = await axios.get(`/services/${serviceId}`);
    console.log(service.data);
    return service;
};

export { getService };
