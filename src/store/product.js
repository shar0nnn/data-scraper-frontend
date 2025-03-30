import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useProductStore = defineStore("productStore", {
    state: () => {
        return {
            router: useRouter(),
            products: null,
            product: {
                id: null,
                title: null,
                description: null,
                manufacturer_part_number: null,
                pack_size_id: null,
            },
            productImages: [],
            validationError: null,
            pagination: {
                currentPage: 1,
                prev: null,
                next: null,
                links: [],
            }
        }
    },
    actions: {
        get(page = 1) {
            axios
                .get(`products?page=${page}`)
                .then((response) => {
                    this.products = response.data.data
                    this.pagination = {
                        currentPage: response.data.meta.current_page,
                        prev: response.data.links.prev,
                        next: response.data.links.next,
                        links: response.data.meta.links.slice(1, -1)
                    }
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        store(selectedRetailers) {
            const formData = new FormData()
            Object.entries(this.product).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value)
                }
            })
            this.productImages.forEach((file) => {
                formData.append('images[]', file)
            })
            selectedRetailers.forEach((retailer, index) => {
                formData.append(`retailers[${index}][id]`, retailer.retailer_id)
                formData.append(`retailers[${index}][url]`, retailer.url)
            })

            axios
                .post("products", formData)
                .then(() => {
                    this.clearProduct()
                    this.router.push({name: "Products"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },
        destroy(id) {
            if (confirm("Are you sure you want to delete?")) {
                axios
                    .delete(`products/${id}`)
                    .then(() => {
                        this.get(this.pagination.currentPage)
                        this.clearProduct()
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    })
            }
        },
        update(id, selectedRetailers) {
            const formData = new FormData()
            Object.entries(this.product).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value)
                }
            })
            this.productImages?.forEach((file) => {
                formData.append('images[]', file)
            })
            selectedRetailers?.forEach((retailer, index) => {
                formData.append(`retailers[${index}][id]`, retailer.retailer_id)
                formData.append(`retailers[${index}][url]`, retailer.url)
            })
            formData.append("_method", "PATCH")
            formData.forEach((key, value) => {
                console.log(key, value)
            })

            axios
                .post(`products/${id}`, formData)
                .then(() => {
                    this.clearProduct()
                    this.router.push({name: "Products"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        setProduct(product) {
            this.product.id = product.id
            this.product.title = product.title
            this.product.description = product.description
            this.product.manufacturer_part_number = product.manufacturer_part_number
            this.product.pack_size_id = product.pack_size
            this.productImages = []
            this.validationError = null
        },
        clearProduct() {
            this.product = {
                id: null,
                title: null,
                description: null,
                manufacturer_part_number: null,
                pack_size_id: null,
            }
            this.productImages = []
            this.validationError = null
        },
        handleFileInput(event) {
            this.productImages = Array.from(event.target.files)
        },
    },
})
