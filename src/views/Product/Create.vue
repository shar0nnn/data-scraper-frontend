<script setup>
import ArgonInput from "@/components/ArgonInput.vue"
import {storeToRefs} from "pinia"
import ArgonButton from "@/components/ArgonButton.vue"
import {onMounted, ref} from "vue"
import {useProductStore} from "@/store/product"
import {usePackSizeStore} from "@/store/packSize"
import {useRetailerStore} from "@/store/retailer"

const {product} = useProductStore()
const {store} = useProductStore()
const {validationError} = storeToRefs(useProductStore())
const {get: getPackSizes} = usePackSizeStore()
const {get: getRetailers} = useRetailerStore()
const {packSizes} = storeToRefs(usePackSizeStore())
const {retailers} = storeToRefs(useRetailerStore())
const {handleFileInput} = useProductStore()
const selectedRetailers = ref([])
const selectedRetailer = ref(null)

const addInputField = () => {
    if (selectedRetailer.value) {
        selectedRetailers.value.push({retailer_id: selectedRetailer.value, url: ""})
    }
}
const getRetailerName = (id) => {
    return retailers.value.find(r => r.id === id).title

}

const removeRetailer = (index) => {
    selectedRetailers.value.splice(index, 1)
}

onMounted(() => {
    getRetailers()
    getPackSizes()
})
</script>
<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-0 d-flex justify-content-between">
                            <h6 class="mb-0">Add new product</h6>

                            <RouterLink :to="{name : 'Products'}" class="btn mb-0 bg-light btn-md">
                                <span class="text-dark">Back</span>
                            </RouterLink>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-control-label text-sm">
                                        Title
                                    </label>
                                    <ArgonInput v-model="product.title" type="text" name="code"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Description
                                    </label>
                                    <ArgonInput v-model="product.description" type="text" name="description"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Manufacturer Part Number
                                    </label>
                                    <ArgonInput v-model="product.manufacturer_part_number" type="text"
                                                name="description"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Pack Size
                                    </label>
                                    <select v-model="product.pack_size_id" class="form-select"
                                            :class="{'is-invalid': validationError}">
                                        <option :value=null disabled selected>Select pack size</option>
                                        <option v-for="packSize in packSizes" :value="packSize.id"
                                                :key="packSize.id">
                                            {{ packSize.name }}
                                        </option>
                                    </select>

                                    <label class="form-control-label text-sm mt-3">
                                        Assign retailers
                                    </label>
                                    <select v-model="selectedRetailer" class="form-select mb-1" @change="addInputField"
                                            :class="{'is-invalid': validationError}">
                                        <option :value=null disabled selected>Select retailer or retailers</option>
                                        <option v-for="retailer in retailers" :value="retailer.id"
                                                :key="retailer.id">
                                            {{ retailer.title }}
                                        </option>
                                    </select>
                                    <div v-for="(field, index) in selectedRetailers" :key="field.retailer_id"
                                         class="d-flex align-items-center">
                                        <input v-model="field.url" type="text" :class="{'is-invalid': validationError}"
                                               :placeholder="`Product URL for ${getRetailerName(field.retailer_id)}`"
                                               class="form-control w-100"/>
                                        <button class="btn btn-danger ms-2 mt-3" @click="removeRetailer(index)">
                                            Decline
                                        </button>
                                    </div>

                                    <label class="form-control-label text-sm mt-3">
                                        Images
                                    </label>
                                    <input @change="handleFileInput" type="file" class="form-control"
                                           :class="{'is-invalid': validationError}" multiple>
                                </div>
                            </div>

                            <div v-if="validationError" class="invalid-feedback" style="display: block">
                                {{ validationError }}
                            </div>

                            <ArgonButton class="mt-3" @click="store(selectedRetailers)" variant="gradient"
                                         color="primary">
                                Save
                            </ArgonButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
