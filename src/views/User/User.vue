<script setup>
import {onMounted} from "vue"
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user"

const {get} = useUserStore()
const {destroy} = useUserStore()
const {clearUser} = useUserStore()
const {users} = storeToRefs(useUserStore())

onMounted(() => {
    get()
})
</script>
<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0 d-flex justify-content-between">
                        <h6 class="mb-0">List of users</h6>

                        <RouterLink @click="clearUser" :to="{name : 'Create User'}"
                                    class="btn mb-0 bg-gradient-primary btn-md">
                            <i class="fas fa-plus me-2"></i>
                            Add user
                        </RouterLink>
                    </div>

                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table v-if="users" class="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7">
                                        ID
                                    </th>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7 ps-2">
                                        Name
                                    </th>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7 ps-2">
                                        Email
                                    </th>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7 ps-2">
                                        Location
                                    </th>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7 ps-2">
                                        Role
                                    </th>
                                    <th class="text-uppercase text-primary text-sm font-weight-bolder opacity-7 ps-2">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>
                                        <div class="d-flex px-3 py-1">
                                            <h6 class="mb-0 text-sm">{{ user.id }}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ user.email }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ user.location?.name }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ user.role?.name }}</h6>
                                    </td>

                                    <td class="align-middle">
                                        <RouterLink :to="{name: 'Edit User', params: {id: user.id}}"
                                                    class="btn btn-link text-dark ps-1 pe-3 mb-0">
                                            <i class="fas fa-pencil-alt text-dark me-1" aria-hidden="true"></i>
                                            Edit
                                        </RouterLink>

                                        <RouterLink @click="destroy(user.id)" to="#"
                                                    class="btn btn-link text-danger text-gradient px-2 mb-0">
                                            <i class="far fa-trash-alt me-1" aria-hidden="true"></i>
                                            Delete
                                        </RouterLink>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
