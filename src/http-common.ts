import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/rest`,
    headers: {
        "Content-type": "application/json"
    }})