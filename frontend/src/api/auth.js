import axios from "axios";

const auth = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export default auth;