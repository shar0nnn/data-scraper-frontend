<script setup>
import {computed} from "vue"
import {useRoute} from "vue-router"
import Breadcrumbs from "@/views/layouts/Header/Breadcrumbs.vue"
import {useAuthStore} from "@/store/auth"
import {useStore} from "vuex"

const store = useStore()
const route = useRoute()
const {logout} = useAuthStore()

const currentRouteName = computed(() => {
    return route.name
})
const minimizeSidebar = () => store.commit("sidebarMinimize")
</script>
<template>
    <nav class="navbar position-sticky z-index-sticky bg-dark left-auto top-2  navbar-main navbar-expand-lg px-1 mx-4
        shadow-none border-radius-xl mb-4" v-bind="$attrs" data-scroll="true">
        <div class="px-3 py-1 container-fluid">
            <Breadcrumbs :current-page="currentRouteName"/>

            <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4">
                <ul class="navbar-nav justify-content-end ms-md-auto">
                    <li class="nav-item d-flex align-items-center">
                        <RouterLink @click="logout" to="#" class="px-0 nav-link font-weight-bold text-white">
                            <i class="ni ni-curved-next me-sm-2"></i>
                            <span class="d-sm-inline d-none text-lg">Log out</span>
                        </RouterLink>
                    </li>

                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a href="#" @click="minimizeSidebar" class="p-0 nav-link text-white" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
