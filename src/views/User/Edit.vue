<script setup>
import ArgonInput from "@/components/ArgonInput.vue"
import {storeToRefs} from "pinia"
import ArgonButton from "@/components/ArgonButton.vue"
import {useUserStore} from "@/store/user"
import {useRetailerStore} from "@/store/retailer"
import {onBeforeMount, onMounted} from "vue"
import {useRoute} from "vue-router"

const route = useRoute()
const {user} = storeToRefs(useUserStore())
const {getRoles} = useUserStore()
const {getUser} = useUserStore()
const {getLocations} = useUserStore()
const {clearUser} = useUserStore()
const {get: getRetailers} = useRetailerStore()
const {update} = useUserStore()
const {validationError} = storeToRefs(useUserStore())
const {roles} = storeToRefs(useUserStore())
const {locations} = storeToRefs(useUserStore())
const {retailers} = storeToRefs(useRetailerStore())

onBeforeMount(() => {
    clearUser()
})

onMounted(() => {
    getUser(route.params.id)
    getRoles()
    getLocations()
    getRetailers()
})
</script>
<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-0 d-flex justify-content-between">
                            <h6 class="mb-0">Edit user</h6>

                            <RouterLink :to="{name : 'Users'}" class="btn mb-0 bg-light btn-md">
                                <span class="text-dark">Back</span>
                            </RouterLink>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-control-label text-sm">
                                        Name
                                    </label>
                                    <ArgonInput v-model="user.name" type="text" name="name"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Email
                                    </label>
                                    <ArgonInput v-model="user.email" type="text" name="email"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Role
                                    </label>
                                    <select v-model="user.role.id" class="form-select"
                                            :class="{'is-invalid': validationError}">
                                        <option v-for="role in roles" :value="role.id" :key="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>

                                    <label class="form-control-label text-sm mt-3">
                                        Location
                                    </label>
                                    <select v-model="user.location.id" class="form-select"
                                            :class="{'is-invalid': validationError}">
                                        <option v-for="location in locations" :value="location.id" :key="location.id">
                                            {{ location.name }}
                                        </option>
                                    </select>

                                    <label class="form-control-label text-sm mt-3">
                                        Assign retailers
                                    </label>
                                    <div v-for="retailer in retailers" class="form-check" :key="retailer.id">
                                        <input class="form-check-input" type="checkbox" :value="retailer.id"
                                               v-model="user.retailers">
                                        <label class="form-check-label">
                                            {{ retailer.title }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div v-if="validationError" class="invalid-feedback" style="display: block">
                                {{ validationError }}
                            </div>

                            <ArgonButton class="mt-3" @click="update(user.id)" variant="gradient" color="primary">
                                Save
                            </ArgonButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
