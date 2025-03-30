<script setup>
import ArgonInput from "@/components/ArgonInput.vue"
import {storeToRefs} from "pinia";
import {usePackSizeStore} from "@/store/packSize";
import ArgonButton from "@/components/ArgonButton.vue";

const {packSize} = usePackSizeStore()
const {store} = usePackSizeStore()
const {validationError} = storeToRefs(usePackSizeStore())
</script>
<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-0 d-flex justify-content-between">
                            <h6 class="mb-0">Add new pack size</h6>

                            <RouterLink :to="{name : 'Pack Sizes'}" class="btn mb-0 bg-light btn-md">
                                <span class="text-dark">Back</span>
                            </RouterLink>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-control-label text-sm">
                                        Name
                                    </label>
                                    <ArgonInput v-model="packSize.name" type="text" name="name"
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
