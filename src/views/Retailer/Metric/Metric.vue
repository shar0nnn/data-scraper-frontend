<script setup>
import MetricCard from "@/views/Retailer/Metric/MetricCard.vue"
import {computed, watch} from "vue"
import {useRetailerMetricStore} from "@/store/retailerMetric"
import {storeToRefs} from "pinia"
import MetricLineChart from "@/views/Retailer/Metric/MetricLineChart.vue"
import ArgonButton from "@/components/ArgonButton.vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const store = useRetailerMetricStore()
const {cardMetrics, chartMetrics, dateRange} = storeToRefs(store)
const {get, exportData} = store

watch(dateRange, () => {
    if (dateRange.value?.[0] && dateRange.value?.[1]) {
        get()
    }
})

const ratingChart = computed(() => ({
    labels: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    ],
    datasets: [{
        label: "Average Rating",
        data: chartMetrics.value?.map(item => item.average_rating) || [],
    }],
    options: {
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                }
            }
        }
    }
}))

const priceChart = computed(() => ({
    labels: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    ],
    datasets: [{
        label: "Average Price",
        data: chartMetrics.value?.map(item => item.average_price) || [],
    }],
    options: {
        scales: {
            y: {
                min: 0,
                max: 200000,
            }
        }
    }
}))

</script>
<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-4 mb-4 d-flex align-items-center gap-3">
                        <div class="flex-grow-1">
                            <VueDatePicker v-model="dateRange" :range="{ partialRange: false }"
                                           :enable-time-picker="false" format="dd.MM.yyyy"/>
                        </div>

                        <ArgonButton @click="exportData" class="bg-gradient-success h-100">
                            <i class="fas fa-plus me-2"></i> Export
                        </ArgonButton>
                    </div>
                </div>

                <div class="row">
                    <div v-for="metric in cardMetrics" class="col-lg-3 col-md-6 col-12" :key="metric.retailer_id">
                        <MetricCard :title="metric.retailer_title" :avg-price="metric.average_price"
                                    :avg-number-of-images="metric.average_number_of_images"
                                    :avg-rating="metric.average_rating"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 mb-4 mt-4">
                        <div class="card z-index-2 shadow">
                            <MetricLineChart id="ratingLineChart" title="Weekly Product Average Ratings"
                                             :chart="ratingChart">
                            </MetricLineChart>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card z-index-2 shadow">
                            <MetricLineChart id="priceLineChart" title="Weekly Product Average Prices"
                                             :chart="priceChart"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>