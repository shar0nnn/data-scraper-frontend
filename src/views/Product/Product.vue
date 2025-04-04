<script setup>
import {onMounted} from "vue"
import {storeToRefs} from "pinia"
import {useProductStore} from "@/store/product"
import ArgonPagination from "@/components/ArgonPagination.vue"
import ArgonPaginationItem from "@/components/ArgonPaginationItem.vue"
import ArgonButton from "@/components/ArgonButton.vue"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const {get} = useProductStore()
const {destroy} = useProductStore()
const {setProduct} = useProductStore()
const {clearProduct} = useProductStore()
const {products, pagination} = storeToRefs(useProductStore())
const {exportData} = useProductStore()
const {exportScrapedData} = useProductStore()
const {handleProductsImport} = useProductStore()
const {importData} = useProductStore()
const {importSuccess} = storeToRefs(useProductStore())
const {importError} = storeToRefs(useProductStore())
const {clearMessages} = useProductStore()
const {dateRange} = storeToRefs(useProductStore())

const fetchProducts = async (page = 1) => {
    get(page)
}

const changePage = (url) => {
    if (url) {
        const page = new URL(url).searchParams.get("page")
        fetchProducts(page)
    }
}

onMounted(() => {
    fetchProducts()
})
</script>
<template>
    <div class="modal fade" id="exportSPModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Choose date range to export</h5>
                </div>
                <div class="modal-body">
                    <VueDatePicker v-model="dateRange" :range="{ partialRange: false }" :enable-time-picker="false"
                                   format="dd.MM.yyyy"/>
                </div>
                <div class="modal-footer">
                    <ArgonButton class="bg-secondary" data-bs-dismiss="modal">Close</ArgonButton>

                    <ArgonButton @click="exportScrapedData" class="bg-warning" :disabled="!dateRange">
                        Export
                    </ArgonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0 d-flex justify-content-between">
                        <h6 class="mb-0">List of products</h6>

                        <div class="d-flex align-items-start gap-3">
                            <ArgonButton @click="importData" class="bg-dark">Import</ArgonButton>

                            <div class="d-flex flex-column w-100">
                                <input @change="handleProductsImport" type="file" class="form-control"
                                       :class="{'is-invalid': importError, 'is-valid': importSuccess}"
                                       @click="clearMessages">

                                <div v-if="importError" class="invalid-feedback">
                                    {{ importError }}
                                </div>
                                <div v-if="importSuccess" class="valid-feedback">
                                    {{ importSuccess }}
                                </div>
                            </div>
                        </div>

                        <div>
                            <ArgonButton class="bg-warning me-4" data-bs-toggle="modal"
                                         data-bs-target="#exportSPModal">
                                Export Scraped Products
                            </ArgonButton>

                            <ArgonButton @click="exportData" class="bg-gradient-success btn-md me-4">
                                Export Products
                            </ArgonButton>

                            <RouterLink @click="clearProduct" :to="{name : 'Create Product'}"
                                        class="btn mb-0 bg-gradient-primary btn-md">
                                <i class="fas fa-plus me-2"></i>
                                Add product
                            </RouterLink>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table v-if="products" class="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7">
                                        ID
                                    </th>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7 ps-2">
                                        Title
                                    </th>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7 ps-2">
                                        Description
                                    </th>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7 ps-2">
                                        Manufacturer Part Number
                                    </th>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7 ps-2">
                                        Pack Size
                                    </th>
                                    <th class="text-uppercase text-info text-sm font-weight-bolder opacity-7 ps-2">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="product in products" :key="product.id">
                                    <td>
                                        <div class="d-flex px-3 py-1">
                                            <h6 class="mb-0 text-sm">{{ product.id }}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ product.title }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">
                                            {{
                                                product.description ? product.description.substring(0, 70) + '...' : ''
                                            }}
                                        </h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ product.manufacturer_part_number }}</h6>
                                    </td>

                                    <td>
                                        <h6 class="mb-0 text-sm">{{ product.pack_size }}</h6>
                                    </td>

                                    <td class="align-middle">
                                        <RouterLink :to="{name: 'Edit Product', params: {id: product.id}}"
                                                    @click="setProduct(product)"
                                                    class="btn btn-link text-dark ps-1 pe-3 mb-0">
                                            <i class="fas fa-pencil-alt text-dark me-1" aria-hidden="true"></i>
                                            Edit
                                        </RouterLink>

                                        <RouterLink @click="destroy(product.id)" to="#"
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

                    <div class="card-footer pb-1 pt-2 d-flex justify-content-center">
                        <ArgonPagination color="primary" size="lg">
                            <ArgonPaginationItem
                                prev
                                @click="changePage(pagination.prev)"
                                :disabled="!pagination.prev"
                            />

                            <ArgonPaginationItem
                                v-for="(link, index) in pagination.links"
                                :key="index"
                                :label="link.label"
                                :active="link.active"
                                @click="fetchProducts(link?.url?.split('page=')[1])"
                            />

                            <ArgonPaginationItem
                                next
                                @click="changePage(pagination.next)"
                                :disabled="!pagination.next"
                            />
                        </ArgonPagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
