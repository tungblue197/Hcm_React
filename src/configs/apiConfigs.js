import axios from 'axios';


const api = axios.create({
    baseURL: 'http://103.74.122.203/kt/api'
})



export default api;