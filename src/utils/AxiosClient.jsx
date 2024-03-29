import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000'

const axiosClient = axios.create({
    baseURL: BASE_URL + '/api/v1'
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const {response} = error;

    if(!response?.status ?? null){
        return
    }
    if (response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})

export default axiosClient;