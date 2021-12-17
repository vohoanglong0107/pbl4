import axios from "axios";
const instance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

export default instance;