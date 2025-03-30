<template>
    <div class="custom-bg text-dark">
        <div class="d-flex align-items-center justify-content-center min-vh-100 px-2">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-2 fw-medium mt-4">Oops! Page not found</p>
                <p class="mt-4 mb-5">The page you're looking for doesn't exist or has been moved.</p>
                <RouterLink :to="{name: 'Home'}" class="btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn">
                    Go Home
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-bg {
    background: linear-gradient(to right, #e2e8f0, #e5e7eb);
}

.custom-btn:hover {
    background-color: #f3e8ff !important;
    transition: background-color 0.3s ease-in-out;
}
</style>