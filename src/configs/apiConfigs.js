import axios from 'axios';


const api = axios.create({
    baseURL: 'http://103.74.122.203/kt/api',
    headers : {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config => {
    console.log('configs : ', config);
    return config;
}, error => {
    return Promise.reject(error);
})

api.interceptors.response.use(response => {
    console.log('response : ', response);
    return response;
}, error => {
    return Promise.reject(error);
})


export default api;