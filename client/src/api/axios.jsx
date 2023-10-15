import axios from "axios";
import { getCookie } from "@helpers/utils";

const apiAxios = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiAxios.interceptors.request.use(config => {
    let csrfToken;

    if (config.url.endsWith('/refresh')) {
        csrfToken = getCookie('csrf_refresh_token');
    } else {
        csrfToken = getCookie('csrf_access_token');
    }

    if (!csrfToken) {
        console.log("no csrf token");
        return config;
    }
    
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    config.withCredentials = true;
    console.log("request interceptor did");
    return config;
});

async function refreshToken() {
    let response = await apiAxios.post('/refresh').catch(error => console.log(error));

    if (!response) {
        return false;
    }
    
    console.log("token refreshed");
    return true;
}

apiAxios.interceptors.response.use(response => response, async (error) => {
    let isAccessTokenError = error.response?.data['msg'] === 'Missing "access_token_cookie"';
    
    if (error.response && error.response.status === 401 && !error.config._retry && isAccessTokenError) {
        let originalConfig = { ...error.config };
        let refreshSuccess = await refreshToken();

        if (!refreshSuccess) {
            console.log("refresh went wrong");
            return error;
        }
        
        console.log("refreshed and trying to send original");
        originalConfig._retry = true;
        let response = await apiAxios.request(originalConfig).catch(error => console.log(error));
        
        if (!response) {
            console.log("resending went wrong");
            return error;
        }

        console.log("resending ok");
        return response;
    }

    return error;
});

export default apiAxios;
