import axios from "axios";

const auth = axios.create({
    baseURL: "https://realstate-api-weje.onrender.com/api/",
});

export default auth;