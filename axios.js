import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.common["Accept"] = "application/json"
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axios
