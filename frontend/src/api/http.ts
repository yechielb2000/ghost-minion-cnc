import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api", // TODO: update the api address
    headers: {
        "Content-Type": "application/json",
    },
});