import axios from 'axios';
import { destroyErrors, destroyMessage, setErrorBag, setMessage } from '@/services/error';

const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true
});

let csrfLoaded = false;

async function ensureCsrfCookie() {
    if (!csrfLoaded) {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
        csrfLoaded = true;
    }
}

http.interceptors.request.use(
    async config => {
        destroyErrors();
        destroyMessage();

        await ensureCsrfCookie();

        return config;
    },
    error => Promise.reject(error)
);

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 422) {
            // default values, had some weird exceptions because one of my laravel endpoints didn't provide an empty error list
            const { errors = {}, message = "Something went wrong, but no error message was provided!" } = error.response.data;

            setErrorBag(errors);
            setMessage(message);
        }
        return Promise.reject(error);
    }
)

export const getRequest = (endpoint : string) => http.get(endpoint);
export const postRequest = (endpoint : string, data : any) => http.post(endpoint, data);
export const putRequest = (endpoint : string, data : any) => http.put(endpoint, data);
export const deleteRequest = (endpoint : string) => http.delete(endpoint);
