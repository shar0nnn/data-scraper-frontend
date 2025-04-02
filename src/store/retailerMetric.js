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
                .get("/retailers/metrics/export?start_date=2025-04-01", {responseType: "blob"})
                .then((response) => {
                    const contentDisposition = response.headers["content-disposition"]
                    let filename = "retailers-metrics.xlsx"

                    if (contentDisposition) {
                        const match = contentDisposition.match(/filename="?(.+?)"?$/)
                        if (match) {
                            filename = match[1]
                        }
                    }

                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const link = document.createElement("a")
                    link.href = url
                    link.setAttribute("download", filename)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                })
                .catch((error) => {
                    alert(error.response)
                })
        },
    },
})
