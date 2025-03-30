<script setup>
import {onMounted} from "vue"
import {storeToRefs} from "pinia"
import {useRetailerStore} from "@/store/retailer"
import ArgonAvatar from "@/components/ArgonAvatar.vue"

const {get} = useRetailerStore()
const {destroy} = useRetailerStore()
const {setRetailer} = useRetailerStore()
const {clearRetailer} = useRetailerStore()
const {retailers} = storeToRefs(useRetailerStore())

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
                        <h6 class="mb-0">List of retailers</h6>

                        <RouterLink @click="clearRetailer" :to="{name : 'Create Retailer'}"
                                    class="btn mb-0 bg-gradient-primary btn-md">
                            <i class="fas fa-plus me-2"></i>
                            Add retailer
                        </RouterLink>
                    </div>

                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table v-if="retailers" class="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7">
                                        ID
                                    </th>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7 ps-2">
                                        Logo
                                    </th>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7 ps-2">
                                        Title
                                    </th>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7 ps-2">
                                        URL
                                    </th>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7 ps-2">
                                        Currency
                                    </th>
                                    <th class="text-uppercase text-success text-sm font-weight-bolder opacity-7 ps-2">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="retailer in retailers" :key="retailer.id">
                                    <td>
                                        <div class="d-flex px-3 py-1">
                                            <h6 class="mb-0 text-sm">{{ retailer.id }}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <ArgonAvatar :image="retailer.logo" border-radius="md"
                                                     alt="Retailer Logo"/>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ retailer.title }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ retailer.url }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ retailer.currency }}</h6>
                                    </td>

                                    <td class="align-middle">
                                        <RouterLink :to="{name: 'Edit Retailer', params: {id: retailer.id}}"
                                                    @click="setRetailer(retailer)"
                                                    class="btn btn-link text-dark ps-1 pe-3 mb-0">
                                            <i class="fas fa-pencil-alt text-dark me-1" aria-hidden="true"></i>
                                            Edit
                                        </RouterLink>

                                        <RouterLink @click="destroy(retailer.id)" to="#"
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
