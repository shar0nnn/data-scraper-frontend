import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useCurrencyStore = defineStore("currencyStore", {
    state: () => {
        return {
            router: useRouter(),
            currencies: null,
            currency: {
                id: null,
                code: null,
                description: null,
                symbol: null,
            },
            validationError: null,
        }
    },
    actions: {
        get() {
            axios
                .get("currencies")
                .then((response) => {
                    this.currencies = response.data.data
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