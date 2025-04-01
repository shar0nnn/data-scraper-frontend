import axios from "axios"
import {createRouter, createWebHistory} from "vue-router"
import Login from "@/views/Login.vue"
import PackSize from "@/views/PackSize/PackSize.vue"
import CreatePackSize from "@/views/PackSize/Create.vue"
import Layout from "@/views/layouts/Layout/Layout.vue"
import NotFound from "@/views/NotFound.vue"
import EditPackSize from "@/views/PackSize/Edit.vue"
import Currency from "@/views/Currency/Currency.vue"
import CreateCurrency from "@/views/Currency/Create.vue"
import EditCurrency from "@/views/Currency/Edit.vue"
import Retailer from "@/views/Retailer/Retailer.vue"
import CreateRetailer from "@/views/Retailer/Create.vue"
import EditRetailer from "@/views/Retailer/Edit.vue"
import Product from "@/views/Product/Product.vue"
import CreateProduct from "@/views/Product/Create.vue"
import EditProduct from "@/views/Product/Edit.vue"
import Metric from "@/views/Retailer/Metric/Metric.vue"

const checkIfUserIsAuthenticated = (to, from, next) => {
    const token = localStorage.getItem("token")
    if (!token) {
        next({name: "Login"})
        return
    }

    axios
        .get("auth-check", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
            next()
        })
        .catch(() => {
            localStorage.removeItem("token")
            next({name: "Login"})
        })
}

const routes = [
    {
        path: "/",
        component: Layout,
        beforeEnter: checkIfUserIsAuthenticated,
        children: [
            {
                path: "/",
                name: "Home",
                redirect: {name: "Retailers Metrics"},
            },
            {
                path: "/retailers/metrics",
                name: "Retailers Metrics",
                component: Metric,
            },

            // -- Retailer --
            {
                path: "/retailers",
                name: "Retailers",
                component: Retailer,
            },
            {
                path: "/retailers/create",
                name: "Create Retailer",
                component: CreateRetailer,
            },
            {
                path: "/retailers/:id/edit",
                name: "Edit Retailer",
                component: EditRetailer,
            },
            // ----

            // -- Product --
            {
                path: "/products",
                name: "Products",
                component: Product,
            },
            {
                path: "/products/create",
                name: "Create Product",
                component: CreateProduct,
            },
            {
                path: "/products/:id/edit",
                name: "Edit Product",
                component: EditProduct,
            },
            // ----

            // -- Currency --
            {
                path: "/currencies",
                name: "Currencies",
                component: Currency,
            },
            {
                path: "/currencies/create",
                name: "Create Currency",
                component: CreateCurrency,
            },
            {
                path: "/currencies/:id/edit",
                name: "Edit Currency",
                component: EditCurrency,
            },
            // ----

            // -- Pack Size --
            {
                path: "/pack-sizes",
                name: "Pack Sizes",
                component: PackSize,
            },
            {
                path: "/pack-sizes/create",
                name: "Create Pack Size",
                component: CreatePackSize,
            },
            {
                path: "/pack-sizes/:id/edit",
                name: "Edit Pack Size",
                component: EditPackSize,
            },
            // ----
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                next({name: "Home"})
            } else {
                next()
            }
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
})

export default router
