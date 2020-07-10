import axios from 'axios';

let Api = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'http://links-api.tmbo.sk/api',
});

Api.defaults.withCredentials = true;
export default Api;