import axios from 'axios';
import { getToken } from '../utils/Auth';
const BASE_URL = 'http://127.0.0.1:8000/api/';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getToken()
     },
    // withCredentials: true
});