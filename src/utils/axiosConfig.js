import axios from "axios";

const axiosAPI = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

const axiosJWT = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

export { axiosAPI, axiosJWT };
