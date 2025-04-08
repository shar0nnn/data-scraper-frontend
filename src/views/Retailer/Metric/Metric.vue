<script setup>
import MetricCard from "@/views/Retailer/Metric/MetricCard.vue"
import {computed, onMounted} from "vue"
import {useRetailerMetricStore} from "@/store/retailerMetric"
import {storeToRefs} from "pinia"
import MetricLineChart from "@/views/Retailer/Metric/MetricLineChart.vue"
import ArgonButton from "@/components/ArgonButton.vue"

const {metrics} = storeToRefs(useRetailerMetricStore())
const {weeklyMetrics} = storeToRefs(useRetailerMetricStore())
const {get} = useRetailerMetricStore()
const {exportData} = useRetailerMetricStore()

onMounted(() => {
    if (metrics.value.length === 0) {
        get('metrics', '2025-04-01')
    }
    if (weeklyMetrics.value.length === 0) {
        get('weeklyMetrics', '2025-03-26')
    }
})

const ratingChart = computed(() => ({
    labels: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ],
    datasets: [{
        label: 'Average Rating',
        data: weeklyMetrics.value?.map(item => item.average_rating) || [],
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
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ],
    datasets: [{
        label: 'Average Price',
        data: weeklyMetrics.value?.map(item => item.average_price) || [],
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
                    <div v-for="metric in metrics" class="col-lg-3 col-md-6 col-12" :key="metric.retailer_id">
                        <MetricCard :title="metric.retailer_title" :avg-price="metric.average_price"
                                    :avg-number-of-images="metric.average_number_of_images"
                                    :avg-rating="metric.average_rating"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card z-index-2 shadow mt-4">
                            <MetricLineChart id="ratingLineChart" title="Weekly Product Average Ratings"
                                             :chart="ratingChart">
                                <template #actions>
                                    <ArgonButton @click="exportData" class="bg-gradient-success">
                                        <i class="fas fa-plus me-2"></i> Export
                                    </ArgonButton>
                                </template>
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