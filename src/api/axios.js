import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://distecnoapi.onrender.com/api',
});

export default instance;
