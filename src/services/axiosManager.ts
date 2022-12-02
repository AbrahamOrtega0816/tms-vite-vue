// First we need to import axios.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_BACKEND_URL;

// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: BASE_URL,
  withCredentials: true,
});

const CONTENT_TYPE = "application/x-www-form-urlencoded";
const ACCEPT = "application/x-www-form-urlencoded";

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.post["Content-Type"] = CONTENT_TYPE;
instance.defaults.headers.common["Accept"] = ACCEPT;

export default instance;
