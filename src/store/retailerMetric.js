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
    },
})
