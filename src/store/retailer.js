import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useRetailerStore = defineStore("retailerStore", {
    state: () => {
        return {
            router: useRouter(),
            retailers: null,
            retailer: {
                id: null,
                title: null,
                url: null,
                currency_id: null,
                logo: null,
            },
            validationError: null,
        }
    },
    actions: {
        get() {
            axios
                .get("retailers")
                .then((response) => {
                    this.retailers = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        store() {
            const formData = new FormData()
            Object.entries(this.retailer).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value)
                }
            })

            axios
                .post("retailers", formData)
                .then(() => {
                    this.clearRetailer()
                    this.router.push({name: "Retailers"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },
        destroy(id) {
            if (confirm("Are you sure you want to delete?")) {
                axios
                    .delete(`retailers/${id}`)
                    .then(() => {
                        this.get()
                        this.clearRetailer()
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    })
            }
        },
        update(id) {
            const formData = new FormData()
            Object.entries(this.retailer).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value)
                }
            })
            formData.append("_method", "PATCH")

            axios
                .post(`retailers/${id}`, formData)
                .then(() => {
                    this.clearRetailer()
                    this.router.push({name: "Retailers"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        setRetailer(retailer) {
            this.retailer.id = retailer.id
            this.retailer.title = retailer.title
            this.retailer.url = retailer.url
            this.retailer.currency_id = retailer.currency
            this.retailer.logo = null
            this.validationError = null
        },
        clearRetailer() {
            this.retailer = {id: null, title: null, url: null, currency_id: null, logo: null}
            this.validationError = null
        },
        handleFileInput(event) {
            this.retailer.logo = event.target.files[0]
        },
    },
})
