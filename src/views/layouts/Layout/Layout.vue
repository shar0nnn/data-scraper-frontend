<script setup>
import Sidebar from "@/views/layouts/Sidebar/Sidebar.vue";
import Footer from "@/views/layouts/Footer/Footer.vue";
import Header from "@/views/layouts/Header/Header.vue";
</script>
<template>
    <Sidebar/>

    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <div style="min-height: 100vh">
            <Header/>

            <RouterView/>
        </div>

        <Footer/>
    </main>
</template>