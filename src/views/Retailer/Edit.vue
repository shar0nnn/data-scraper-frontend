<script setup>
import ArgonInput from "@/components/ArgonInput.vue"
import {storeToRefs} from "pinia"
import ArgonButton from "@/components/ArgonButton.vue"
import {useRoute} from "vue-router"
import {useRetailerStore} from "@/store/retailer"
import {useCurrencyStore} from "@/store/currency"
import {onMounted} from "vue"

const {retailer} = useRetailerStore()
const {get} = useCurrencyStore()
const {currencies} = storeToRefs(useCurrencyStore())
const route = useRoute()
const {update} = useRetailerStore()
const {validationError} = storeToRefs(useRetailerStore())
const {handleFileInput} = useRetailerStore()

onMounted(() => {
    get()

    // Find correct currency id by it`s code and set to retailer.currency_id
    retailer.currency_id = currencies.value?.find(currency => currency.code === retailer.currency_id)?.id
})
</script>
<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-0 d-flex justify-content-between">
                            <h6 class="mb-0">Edit retailer</h6>

                            <RouterLink :to="{name : 'Retailers'}" class="btn mb-0 bg-light btn-md">
                                <span class="text-dark">Back</span>
                            </RouterLink>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-control-label text-sm mt-3">
                                        Title
                                    </label>
                                    <ArgonInput v-model="retailer.title" type="text" name="code"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        URL
                                    </label>
                                    <ArgonInput v-model="retailer.url" type="text" name="description"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Currency
                                    </label>
                                    <select v-model="retailer.currency_id" class="form-select"
                                            :class="{'is-invalid': validationError}">
                                        <option :value=null disabled selected>Select currency</option>
                                        <option v-for="currency in currencies" :value="currency.id"
                                                :key="currency.id">
                                            {{ currency.code }} ({{ currency.description }})
                                        </option>
                                    </select>

                                    <label class="form-control-label text-sm mt-3">
                                        Logo
                                    </label>
                                    <input @change="handleFileInput" type="file" class="form-control"
                                           :class="{'is-invalid': validationError}">
                                </div>
                            </div>

                            <div v-if="validationError" class="invalid-feedback" style="display: block">
                                {{ validationError }}
                            </div>

                            <ArgonButton class="mt-3" @click="update(route.params.id)" variant="gradient"
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
