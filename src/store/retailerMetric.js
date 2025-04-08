import axios from "../../axios"
import {defineStore} from "pinia"

export const useRetailerMetricStore = defineStore("retailerMetricStore", {
    state: () => {
        return {
            metrics: [],
            weeklyMetrics: [],
        }
    },
    actions: {
        get(key, start_date) {
            axios
                .get(`retailers/metrics?start_date=${start_date}`)
                .then((response) => {
                    this[key] = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },

        exportData() {
            axios
                .get("/retailers/metrics/export?start_date=2024-04-05&end_date=2024-05-05")
                .then((response) => {
                    window.location.href = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
    },
})
