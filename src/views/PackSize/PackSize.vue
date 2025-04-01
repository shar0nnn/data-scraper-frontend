<script setup>
import {usePackSizeStore} from "@/store/packSize"
import {onMounted} from "vue"
import {storeToRefs} from "pinia"

const {get} = usePackSizeStore()
const {destroy} = usePackSizeStore()
const {setPackSize} = usePackSizeStore()
const {clearPackSize} = usePackSizeStore()
const {packSizes} = storeToRefs(usePackSizeStore())

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
                        <h6 class="mb-0">List of pack sizes</h6>

                        <RouterLink @click="clearPackSize" :to="{name : 'Create Pack Size'}"
                                    class="btn mb-0 bg-gradient-primary btn-md">
                            <i class="fas fa-plus me-2"></i>
                            Add pack size
                        </RouterLink>
                    </div>

                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table v-if="packSizes" class="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7">
                                        ID
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Name
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="packSize in packSizes" :key="packSize.id">
                                    <td>
                                        <div class="d-flex px-3 py-1">
                                            <h6 class="mb-0 text-sm">{{ packSize.id }}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ packSize.name }}</h6>
                                    </td>

                                    <td class="align-middle">
                                        <RouterLink :to="{name: 'Edit Pack Size', params: {id: packSize.id}}"
                                                    @click="setPackSize(packSize)"
                                                    class="btn btn-link text-dark ps-1 pe-3 mb-0">
                                            <i class="fas fa-pencil-alt text-dark me-1" aria-hidden="true"></i>
                                            Edit
                                        </RouterLink>

                                        <RouterLink @click="destroy(packSize.id)" to="#"
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
