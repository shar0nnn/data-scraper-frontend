import axios from "../../axios"
import {defineStore} from "pinia"
import {useRouter} from "vue-router"

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            router: useRouter(),
            users: null,
            roles: null,
            locations: null,
            user: {
                id: null,
                name: null,
                email: null,
                password: null,
                location: {
                    id: null,
                    name: null,
                },
                role: {
                    id: null,
                    name: null,
                },
                retailers: [],
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
                .post("users", {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    role_id: this.user.role.id,
                    location_id: this.user.location.id,
                    retailers: this.user.retailers,
                })
                .then(() => {
                    this.clearUser()
                    this.router.push({name: "Users"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },
        destroy(id) {
            if (confirm("Are you sure you want to delete?")) {
                axios
                    .delete(`users/${id}`)
                    .then(() => {
                        this.get()
                        this.clearUser()
                    })
                    .catch((error) => {
                        alert(error.response.data.message)
                    })
            }
        },
        update(id) {
            axios
                .patch(`users/${id}`, {
                    name: this.user.name,
                    email: this.user.email,
                    role_id: this.user.role.id,
                    location_id: this.user.location.id,
                    retailers: this.user.retailers,
                })
                .then(() => {
                    this.clearUser()
                    this.router.push({name: "Users"})
                })
                .catch((error) => {
                    this.validationError = error.response.data.message
                })
        },

        getRoles() {
            axios
                .get("roles")
                .then((response) => {
                    this.roles = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        getLocations() {
            axios
                .get("locations")
                .then((response) => {
                    this.locations = response.data.data
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },

        getUser(id) {
            axios
                .get(`users/${id}`)
                .then((response) => {
                    const data = response.data.data

                    this.user.id = data.id
                    this.user.name = data.name
                    this.user.email = data.email

                    this.user.location = {
                        id: data.location?.id ?? null,
                        name: data.location?.name ?? null
                    }

                    this.user.role = {
                        id: data.role.id,
                        name: data.role.name
                    }

                    this.user.retailers = data.retailers.map(r => r.id)

                    this.validationError = null
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        },
        clearUser() {
            this.user = {
                id: null,
                name: null,
                email: null,
                password: null,
                location: {
                    id: null,
                    name: null,
                },
                role: {
                    id: null,
                    name: null,
                },
                retailers: []
            }
            this.validationError = null
        }

    },
})