<script setup>
import {onMounted} from "vue"
import {storeToRefs} from "pinia"
import {useProductStore} from "@/store/product"
import ArgonPagination from "@/components/ArgonPagination.vue"
import ArgonPaginationItem from "@/components/ArgonPaginationItem.vue"
import ArgonButton from "@/components/ArgonButton.vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import {useRetailerStore} from "@/store/retailer"
import {usePackSizeStore} from "@/store/packSize"
import ArgonInput from "@/components/ArgonInput.vue"

const productStore = useProductStore()
const {
    get,
    destroy,
    setProduct,
    clearProduct,
    exportProducts,
    exportScrapedProducts,
    handleProductsImport,
    importProducts,
    clearMessages
} = productStore

const {
    products,
    pagination,
    importSuccess,
    importError,
    dateRange,
    retailerIds,
    packSizeIds,
    search
} = storeToRefs(productStore)

const retailerStore = useRetailerStore()
const {getUserRetailers} = retailerStore
const {retailers} = storeToRefs(retailerStore)

const packSizeStore = usePackSizeStore()
const {get: getPackSizes} = packSizeStore
const {packSizes} = storeToRefs(packSizeStore)

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
    <div class="modal fade" id="filterRetailers" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Choose retailers</h5>
                </div>
                <div class="modal-body">
                    <div v-for="retailer in retailers" class="form-check" :key="retailer.id">
                        <input class="form-check-input" type="checkbox" :value="retailer.id"
                               v-model="retailerIds">
                        <label class="form-check-label">
                            {{ retailer.title }}
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <ArgonButton class="bg-secondary" data-bs-dismiss="modal">Close</ArgonButton>

                    <ArgonButton @click="get" class="bg-primary" data-bs-dismiss="modal">
                        Filter
                    </ArgonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="filterPackSizes" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Choose pack sizes</h5>
                </div>
                <div class="modal-body">
                    <div v-for="packSize in packSizes" class="form-check" :key="packSize.id">
                        <input class="form-check-input" type="checkbox" :value="packSize.id"
                               v-model="packSizeIds">
                        <label class="form-check-label">
                            {{ packSize.name }}
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <ArgonButton class="bg-secondary" data-bs-dismiss="modal">Close</ArgonButton>

                    <ArgonButton @click="get" class="bg-primary" data-bs-dismiss="modal">
                        Filter
                    </ArgonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exportSPModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Choose date range to export</h5>
                </div>
                <div class="modal-body">
                    <VueDatePicker v-model="dateRange" :range="{ partialRange: false }" :enable-time-picker="false"
                                   format="dd.MM.yyyy"/>
                </div>
                <div class="modal-footer">
                    <ArgonButton class="bg-secondary" data-bs-dismiss="modal">Close</ArgonButton>

                    <ArgonButton @click="exportScrapedProducts" class="bg-warning" :disabled="!dateRange">
                        Export
                    </ArgonButton>
                </div>
            </div>
        </div>
    </div>

    <div class="py-4 container-fluid">
        <div class="row mb-3">
            <div class="col-12 d-flex align-items-stretch gap-4">
                <ArgonButton @click="getUserRetailers" class="bg-primary" data-bs-toggle="modal"
                             data-bs-target="#filterRetailers">
                    Filter By Retailers
                </ArgonButton>

                <ArgonButton @click="getPackSizes" class="bg-primary" data-bs-toggle="modal"
                             data-bs-target="#filterPackSizes">
                    Filter By Pack Sizes
                </ArgonButton>

                <div class="col-4 d-flex align-items-stretch">
                    <ArgonInput v-model="search" placeholder="title, description, manufacturer part number..."
                                class="w-100 mb-0"/>
                    <ArgonButton @click="get" class="bg-primary">
                        Search
                    </ArgonButton>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0 d-flex justify-content-between">
                        <h6 class="mb-0">List of products</h6>

                        <div class="d-flex align-items-start gap-3">
                            <ArgonButton @click="importProducts" class="bg-dark">Import</ArgonButton>

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

                            <ArgonButton @click="exportProducts" class="bg-gradient-success btn-md me-4">
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
                                                product.description ? product.description.substring(0, 70) + "..." : ""
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
