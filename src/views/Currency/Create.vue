<script setup>
import ArgonInput from "@/components/ArgonInput.vue"
import {storeToRefs} from "pinia"
import ArgonButton from "@/components/ArgonButton.vue"
import {useCurrencyStore} from "@/store/currency"

const {currency} = useCurrencyStore()
const {store} = useCurrencyStore()
const {validationError} = storeToRefs(useCurrencyStore())
</script>
<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-0 d-flex justify-content-between">
                            <h6 class="mb-0">Add new currency</h6>

                            <RouterLink :to="{name : 'Currencies'}" class="btn mb-0 bg-light btn-md">
                                <span class="text-dark">Back</span>
                            </RouterLink>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-control-label text-sm">
                                        Code
                                    </label>
                                    <ArgonInput v-model="currency.code" type="text" name="code"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Description
                                    </label>
                                    <ArgonInput v-model="currency.description" type="text" name="description"
                                                :error="validationError" class="mb-1"/>

                                    <label class="form-control-label text-sm mt-3">
                                        Symbol
                                    </label>
                                    <ArgonInput v-model="currency.symbol" type="text" name="symbol"
                                                :error="validationError" class="mb-1"/>
                                </div>
                            </div>

                            <div v-if="validationError" class="invalid-feedback" style="display: block">
                                {{ validationError }}
                            </div>

                            <ArgonButton class="mt-3" @click="store" variant="gradient" color="primary">
                                Save
                            </ArgonButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
