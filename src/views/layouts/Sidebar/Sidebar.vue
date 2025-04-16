<script setup>
import SidebarItem from "./SidebarItem.vue"
import {computed} from "vue"
import {useRoute} from "vue-router"

const route = useRoute()

const bgColor = computed(() => {
    switch (true) {
        case route.path.startsWith("/retailers/metrics"):
            return "bg-primary"
        case route.path.startsWith("/retailers"):
            return "bg-success"
        case route.path.startsWith("/products"):
            return "bg-info"
        case route.path.startsWith("/login"):
            return "bg-secondary"
        case route.path.startsWith("/currencies"):
            return "bg-warning"
        case route.path.startsWith("/pack-sizes"):
            return "bg-warning"
        default:
            return "bg-primary"
    }
})
</script>
<template>
    <div :class="bgColor" class="min-height-300 position-absolute w-100"/>

    <aside class="bg-white my-3 fixed-start ms-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs
     border-radius-xl" id="sidenav-main" data-color="primary">
        <div class="sidenav-header">
            <RouterLink class="m-0 navbar-brand" :to="{name: 'Home'}">
                <span class="ms-4 font-weight-bold fs-5">Data Scraper</span>
            </RouterLink>
        </div>

        <hr class="mt-0 horizontal dark"/>

        <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <SidebarItem :to="{name: 'Users'}" navText="Users">
                        <template v-slot:icon>
                            <i class="ni ni-settings text-primary text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <li class="nav-item">
                    <SidebarItem :to="{name: 'Retailers Metrics'}" navText="Retailers Metrics">
                        <template v-slot:icon>
                            <i class="ni ni-chart-bar-32 text-primary text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <li class="nav-item">
                    <SidebarItem :to="{name: 'Retailers'}" navText="Retailers">
                        <template v-slot:icon>
                            <i class="ni ni-shop text-success text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <li class="nav-item">
                    <SidebarItem :to="{name: 'Products'}" navText="Products">
                        <template v-slot:icon>
                            <i class="ni ni-basket text-info text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <li class="nav-item">
                    <SidebarItem :to="{name: 'Currencies'}" navText="Currencies">
                        <template v-slot:icon>
                            <i class="ni ni-money-coins text-warning text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <li class="nav-item">
                    <SidebarItem :to="{name: 'Pack Sizes'}" navText="Pack sizes">
                        <template v-slot:icon>
                            <i class="ni ni-app text-warning text-sm opacity-10"></i>
                        </template>
                    </SidebarItem>
                </li>

                <hr class="horizontal dark"/>
            </ul>
        </div>
    </aside>
</template>
