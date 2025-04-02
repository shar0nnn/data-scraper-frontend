<script setup>
import {onMounted} from "vue"
import {storeToRefs} from "pinia"
import {useCurrencyStore} from "@/store/currency"

const {get} = useCurrencyStore()
const {destroy} = useCurrencyStore()
const {setCurrency} = useCurrencyStore()
const {clearCurrency} = useCurrencyStore()
const {currencies} = storeToRefs(useCurrencyStore())

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
                        <h6 class="mb-0">List of currencies</h6>

                        <RouterLink @click="clearCurrency" :to="{name : 'Create Currency'}"
                                    class="btn mb-0 bg-gradient-primary btn-md">
                            <i class="fas fa-plus me-2"></i>
                            Add currency
                        </RouterLink>
                    </div>

                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table v-if="currencies" class="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7">
                                        ID
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Code
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Description
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Symbol
                                    </th>
                                    <th class="text-uppercase text-warning text-sm font-weight-bolder opacity-7 ps-2">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="currency in currencies" :key="currency.id">
                                    <td>
                                        <div class="d-flex px-3 py-1">
                                            <h6 class="mb-0 text-sm">{{ currency.id }}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ currency.code }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ currency.description }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ currency.symbol }}</h6>
                                    </td>

                                    <td class="align-middle">
                                        <RouterLink :to="{name: 'Edit Currency', params: {id: currency.id}}"
                                                    @click="setCurrency(currency)"
                                                    class="btn btn-link text-dark ps-1 pe-3 mb-0">
                                            <i class="fas fa-pencil-alt text-dark me-1" aria-hidden="true"></i>
                                            Edit
                                        </RouterLink>

                                        <RouterLink @click="destroy(currency.id)" to="#"
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
