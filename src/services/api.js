import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-dev-radar.herokuapp.com'
});

export default api;