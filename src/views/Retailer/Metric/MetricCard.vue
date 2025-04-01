<script setup>
defineProps({
    title: {
        type: Object,
        required: true,
    },
    avgPrice: {
        type: Object,
        required: true,
    },
    avgNumberOfImages: {
        type: Object,
        required: true,
    },
    avgRating: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="mb-3 card bg-light shadow">
        <div class="p-3 card-body">
            <p class="mb-0 text-lg text-uppercase font-weight-bold text-primary">
                {{ title }}
            </p>

            <p class="mt-2 mb-0 d-flex justify-content-between">
                <span class="text-dark">Average Rating: </span>
                <span class="text-danger">{{ avgRating }}</span>
            </p>

            <p class="mt-2 mb-0 d-flex justify-content-between">
                <span class="text-dark">Average Price: </span>
                <span class="text-danger">{{ avgPrice }}</span>
            </p>

            <p class="mt-2 mb-0 d-flex justify-content-between">
                <span class="text-dark">Average Number of Images: </span>
                <span class="text-danger">{{ avgNumberOfImages }}</span>
            </p>
        </div>
    </div>
</template>
