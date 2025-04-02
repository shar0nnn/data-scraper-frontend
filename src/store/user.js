import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            router: useRouter(),
            users: null,
            user: {
                id: null,
                name: null,
                email: null,
                password: null,
            },
            validationError: null,
        }
    },
    actions: {
        get() {
            axios
                .get("users")
                .then((response) => {
                    this.users = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        store() {
            axios
                .post("currencies", {
                    code: this.currency.code,
                    description: this.currency.description,
                    symbol: this.currency.symbol,
                })
                .then(() => {
                    this.clearCurrency()
                    this.router.push({name: "Currencies"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },
        destroy(id) {
            if (confirm("Are you sure you want to delete?")) {
                axios
                    .delete(`currencies/${id}`)
                    .then(() => {
                        this.get()
                        this.clearCurrency()
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    })
            }
        },
        update(id) {
            axios
                .patch(`currencies/${id}`, {
                    code: this.currency.code,
                    description: this.currency.description,
                    symbol: this.currency.symbol,
                })
                .then(() => {
                    this.clearCurrency()
                    this.router.push({name: "Currencies"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        setCurrency(currency) {
            this.currency = currency
            this.validationError = null
        },
        clearCurrency() {
            this.currency = {id: null, code: null, description: null, symbol: null}
            this.validationError = null
        }
    },
})