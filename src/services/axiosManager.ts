// First we need to import axios.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_BACKEND_URL;

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: BASE_URL
});

const CONTENT_TYPE = "application/x-www-form-urlencoded";
const AUTH_TYPE  = "Bearer";
const AUTH_TOKEN = localStorage.getItem('token');

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = `${AUTH_TYPE} ${AUTH_TOKEN}`;
instance.defaults.headers.post["Content-Type"] = CONTENT_TYPE;

export default instance;
