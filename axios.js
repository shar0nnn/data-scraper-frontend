import axios from "axios"

axios.defaults.baseURL = "http://localhost/api/"
axios.defaults.headers.common["Accept"] = "application/json"
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axios
