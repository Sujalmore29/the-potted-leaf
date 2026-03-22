import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
    baseURL: "http://localhost:8080"
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token && !config.url.includes("/auth/login") && !config.url.includes("auth/register")){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

instance.interceptors.response.use((response) => response,
    (error) => {
        if(error.response && error.response.status === 403 || error.response.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/login";
            toast.error("Session expired. Please login again.");
        }
        return Promise.reject(error);
    })

export default instance;