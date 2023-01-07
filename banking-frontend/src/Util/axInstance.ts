import axios from "axios";

export const axInst = axios.create({
    baseURL: "http://54.92.221.53:8000",
    // baseURL: "http://localhost:8000",
});
