import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers['X-CSRF-TOKEN'] = getCookie('csrf_access_token')
    console.log(getCookie('csrf_access_token'));

    return config;
})

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}