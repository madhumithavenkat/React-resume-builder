import axios from 'axios';

// const BASE_URL = 'http://localhost:8010'
const BASE_URL = 'https://resume-builder-server-six.vercel.app';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});