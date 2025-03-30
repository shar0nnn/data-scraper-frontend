import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const usePackSizeStore = defineStore("packSizeStore", {
    state: () => {
        return {
            router: useRouter(),
            packSizes: null,
            packSize: {
                id: null,
                name: null,
            },
            validationError: null,
        }
    },
    actions: {
        get() {
            axios
                .get("pack-sizes")
                .then((response) => {
                    this.packSizes = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        store() {
            axios
                .post("pack-sizes", {
                    name: this.packSize.name
                })
                .then(() => {
                    this.clearPackSize()
                    this.router.push({name: "Pack Sizes"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },
        destroy(id) {
            if (confirm("Are you sure you want to delete?")) {
                axios
                    .delete(`pack-sizes/${id}`)
                    .then(() => {
                        this.get()
                        this.clearPackSize()
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    })
            }
        },
        update(id) {
            axios
                .patch(`pack-sizes/${id}`, {
                    name: this.packSize.name
                })
                .then(() => {
                    this.clearPackSize()
                    this.router.push({name: "Pack Sizes"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        setPackSize(packSize) {
            this.packSize = packSize
            this.validationError = null
        },
        clearPackSize() {
            this.packSize = {id: null, name: null}
            this.validationError = null
        }
    },
})
