import axios from 'axios';

let Api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
});

export default Api;