<script setup>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import {useAuthStore} from "@/store/auth";
import {reactive} from "vue";
import {storeToRefs} from "pinia";

const {validationError} = storeToRefs(useAuthStore())
const {login} = useAuthStore()

const formData = reactive({
    email: '',
    password: '',
})
</script>
<template>
    <main class="mt-0 main-content bg-light ">
        <section>
            <div class="page-header min-vh-100">
                <div class="container mb-8">
                    <div class="row">
                        <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column">
                            <div class="card card-plain">
                                <div class="pb-0 card-header text-center text-start bg-light">
                                    <h4 class="font-weight-bolder">Log In</h4>
                                    <p class="mb-0">Enter your email and password to log in</p>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="login(formData)" role="form">
                                        <div class="mb-3">
                                            <ArgonInput v-model="formData.email" id="email" placeholder="Email"
                                                        name="email" size="lg" :error="validationError"/>
                                        </div>
                                        <div class="mb-3">
                                            <ArgonInput class="mb-1" v-model="formData.password" type="password"
                                                        name="password"
                                                        placeholder="Password" :error="validationError" size="lg"/>
                                            <div v-if="validationError" class="invalid-feedback"
                                                 style="display: block">
                                                {{ validationError }}
                                            </div>
                                        </div>

                                        <div class="text-center">
                                            <ArgonButton variant="gradient" color="success" fullWidth size="lg">
                                                Log in
                                            </ArgonButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
