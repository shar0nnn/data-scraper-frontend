import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            validationError: null,
            router: useRouter(),
            token: localStorage.getItem("token"),
            userIsAdmin: null,
        }
    },
    actions: {
        login(formData) {
            axios
                .post("login", {
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    this.setToken(response.data.data?.token)
                    this.router.push({name: "Home"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        logout() {
            axios
                .delete("logout")
                .then(() => {
                    this.removeToken()
                    this.router.push("/login")
                })
        },

        setToken(token) {
            this.token = token
            localStorage.setItem("token", token)
        },
        removeToken() {
            this.token = null
            localStorage.removeItem("token")
        },

        checkIfUserIsAdmin() {
            axios
                .get("admin-check")
                .then((response) => {
                    response.data.data ? this.userIsAdmin = true : this.userIsAdmin = false
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        }
    },
})
