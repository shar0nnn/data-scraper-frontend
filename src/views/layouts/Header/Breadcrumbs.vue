<script setup>
defineProps({
    currentPage: {
        type: String,
        default: "",
    },
})
</script>
<template>
    <nav aria-label="breadcrumb">
        <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb me-sm-6 text-white">
            <li class="text-sm breadcrumb-item">
                <a class="opacity-8 text-white" href="#">
                    Pages
                </a>
            </li>

            <li class="text-sm breadcrumb-item active text-white" aria-current="page">
                {{ currentPage }}
            </li>
        </ol>
        <h6 class="mb-0 font-weight-bolder text-white">
            {{ currentPage }}
        </h6>
    </nav>
</template>
