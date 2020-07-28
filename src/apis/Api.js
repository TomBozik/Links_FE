import axios from 'axios';

let url = 'https://links-api.tmbo.sk/api'
if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/api'
}

let BaseApi = axios.create({
    baseURL: url
});

let Api = function(){
    let token = localStorage.getItem('token');

    if(token){
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return BaseApi;
}

export default Api;