<script setup>
import {onMounted, watch} from "vue"
import Chart from "chart.js/auto"

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        default: "300",
    },
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    chart: {
        type: Object,
        required: true,
        labels: Array,
        datasets: {
            type: Array,
            label: String,
            data: Array,
        },
    },
})

const createChart = () => {
    const canvas = document.getElementById(props.id)
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let sanitizedData = props.chart.datasets[0].data.map(Number)
    let chartInstance = Chart.getChart(props.id)
    if (chartInstance) {
        chartInstance.destroy()
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: props.chart.labels,
            datasets: [{
                label: props.chart.datasets[0].label,
                data: sanitizedData,
                borderColor: "#4BB543",
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                backgroundColor: "rgba(203,12,159,0.2)",
                maxBarThickness: 6,
            }],
        },
        options: {
            ...props.chart.options,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            }
        }
    })
}

onMounted(() => {
    createChart()
})

watch(() => props.chart, (newChart) => {
    if (newChart.datasets[0].data.length > 0) {
        createChart()
    }
}, {deep: true})
</script>

<template>
    <div class="card z-index-2 shadow">
        <div class="pb-0 card-header mb-0">
            <h6>{{ props.title }}</h6>

            <p v-if="props.description" class="text-sm" v-html="props.description"/>
        </div>
        <div class="p-3 card-body">
            <div class="chart">
                <canvas
                    :id="props.id"
                    class="chart-canvas"
                    :height="props.height"
                ></canvas>
            </div>
        </div>
    </div>
</template>
