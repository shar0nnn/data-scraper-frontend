<template>
    <footer class="py-5 footer">
        <div class="container">
            <div class="row">
                <div class="mx-auto mb-4 text-center col-lg-8">
<!--                    <RouterLink :to="{name: 'Dashboard'}" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">-->
<!--                        Dashboard-->
<!--                    </RouterLink>-->

                    <RouterLink :to="{name: 'Retailers'}" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
                        Retailers
                    </RouterLink>

                    <RouterLink :to="{name: 'Products'}" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
                        Products
                    </RouterLink>

                    <RouterLink :to="{name: 'Currencies'}" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
                        Currencies
                    </RouterLink>

                    <RouterLink :to="{name: 'Pack Sizes'}" class="mb-2 text-secondary me-xl-5 me-3 mb-sm-0">
                        Pack sizes
                    </RouterLink>
                </div>
            </div>
            <div class="row">
                <div class="mx-auto mt-1 text-center col-8">
                    <p class="mb-0 text-secondary">
                        Copyright © {{ new Date().getFullYear() }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>