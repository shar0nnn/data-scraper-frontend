import axios from "../../axios"
import {defineStore} from "pinia"
import qs from "qs"
import dayjs from "dayjs"

export const useRetailerMetricStore = defineStore("retailerMetricStore", {
    state: () => ({
        cardMetrics: [],
        chartMetrics: [],
        filters: {
            start_date: null,
            end_date: null,
        },
        dateRange: [],
    }),

    actions: {
        get() {
            this.filters.start_date = dayjs(this.dateRange[0]).format("YYYY-MM-DD")
            this.filters.end_date = dayjs(this.dateRange[1]).format("YYYY-MM-DD")

            axios
                .get(`retailers/metrics?${qs.stringify(this.filters, {arrayFormat: "repeat"})}`)
                .then((response) => {
                    const metrics = response.data.data

                    const lastDay = dayjs(this.dateRange[1]).format("DD.MM.YYYY")
                    const lastWeek = dayjs(this.dateRange[1]).subtract(6, "days").format("DD.MM.YYYY")

                    this.cardMetrics = metrics.filter(item => item.scraped_at === lastDay)
                    this.chartMetrics = metrics.filter(item => item.scraped_at >= lastWeek)
                })
                .catch((error) => {
                    alert(error.response?.data?.message)
                })
        },

        exportData() {
            axios
                .get(`/retailers/metrics/export?${qs.stringify(this.filters, {arrayFormat: "repeat"})}`)
                .then((response) => {
                    window.location.href = response.data.data
                })
                .catch((error) => {
                    alert(error.response?.data?.message)
                })
        },
    }
})