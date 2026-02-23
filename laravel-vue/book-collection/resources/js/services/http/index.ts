import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getRequest = (endpoint : string) => http.get(endpoint);
export const postRequest = (endpoint : string, data : any) => http.post(endpoint, data);
export const putRequest = (endpoint : string, data : any) => http.put(endpoint, data);
export const deleteRequest = (endpoint : string) => http.delete(endpoint);