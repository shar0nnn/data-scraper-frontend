import axios from "axios"
import { createRouter, createWebHistory } from "vue-router"
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
import User from "@/views/User/User.vue"
import CreateUser from "@/views/User/Create.vue"
import EditUser from "@/views/User/Edit.vue"

// Route name and path constants
const ROUTES = {
    LOGIN: {
        path: '/login',
        name: 'Login'
    },
    HOME: {
        path: '/',
        name: 'Home'
    },
    ADMIN_HOME: {
        path: '/',
        name: 'Admin Home'
    },
    NOT_FOUND: {
        path: '/:pathMatch(.*)*',
        name: 'NotFound'
    }
}

// Authentication middleware
const authMiddleware = {
    async checkAuth(token) {
        try {
            await axios.get("auth-check", {
                headers: { Authorization: `Bearer ${token}` }
            })
            return true
        } catch {
            localStorage.removeItem("token")
            return false
        }
    },

    async checkAdmin(token) {
        try {
            const response = await axios.get("admin-check", {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data.data
        } catch (error) {
            alert(error.response.data.message)
            return false
        }
    },

    requireAuth: async (to, from, next) => {
        const token = localStorage.getItem("token")
        if (!token || !(await authMiddleware.checkAuth(token))) {
            return next({ name: ROUTES.LOGIN.name })
        }
        next()
    },

    checkUserAccess: async (to, from, next, requireAdmin = true) => {
        const token = localStorage.getItem("token")
        const isAdmin = await authMiddleware.checkAdmin(token)
        const hasCorrectRole = requireAdmin ? isAdmin : !isAdmin
        next(hasCorrectRole ? undefined : { name: requireAdmin ? ROUTES.HOME.name : ROUTES.ADMIN_HOME.name })
    },

    checkAuthStatus: (to, from, next) => {
        const token = localStorage.getItem("token")
        if (token) {
            authMiddleware.checkAdmin(token)
                .then(isAdmin => next({ name: isAdmin ? ROUTES.ADMIN_HOME.name : ROUTES.HOME.name }))
        } else {
            next()
        }
    }
}

// Admin routes configuration
const adminRoutes = {
    path: '/',
    beforeEnter: (to, from, next) => authMiddleware.checkUserAccess(to, from, next, true),
    children: [
        {
            ...ROUTES.ADMIN_HOME,
            redirect: { name: 'Users' }
        },
        {
            path: '/users',
            children: [
                { path: '', name: 'Users', component: User },
                { path: 'create', name: 'Create User', component: CreateUser },
                { path: ':id/edit', name: 'Edit User', component: EditUser }
            ]
        },
        {
            path: '/retailers',
            children: [
                { path: '', name: 'Retailers', component: Retailer },
                { path: 'create', name: 'Create Retailer', component: CreateRetailer },
                { path: ':id/edit', name: 'Edit Retailer', component: EditRetailer }
            ]
        },
        {
            path: '/currencies',
            children: [
                { path: '', name: 'Currencies', component: Currency },
                { path: 'create', name: 'Create Currency', component: CreateCurrency },
                { path: ':id/edit', name: 'Edit Currency', component: EditCurrency }
            ]
        }
    ]
}

// Non-admin routes configuration
const userRoutes = {
    path: '/',
    beforeEnter: (to, from, next) => authMiddleware.checkUserAccess(to, from, next, false),
    children: [
        {
            ...ROUTES.HOME,
            redirect: { name: 'Retailers Metrics' }
        },
        { 
            path: '/retailers/metrics', 
            name: 'Retailers Metrics', 
            component: Metric 
        },
        {
            path: '/products',
            children: [
                { path: '', name: 'Products', component: Product },
                { path: 'create', name: 'Create Product', component: CreateProduct },
                { path: ':id/edit', name: 'Edit Product', component: EditProduct }
            ]
        },
        {
            path: '/pack-sizes',
            children: [
                { path: '', name: 'Pack Sizes', component: PackSize },
                { path: 'create', name: 'Create Pack Size', component: CreatePackSize },
                { path: ':id/edit', name: 'Edit Pack Size', component: EditPackSize }
            ]
        }
    ]
}

// Main routes configuration
const routes = [
    {
        path: '/',
        component: Layout,
        beforeEnter: authMiddleware.requireAuth,
        children: [adminRoutes, userRoutes]
    },
    {
        ...ROUTES.LOGIN,
        component: Login,
        beforeEnter: authMiddleware.checkAuthStatus
    },
    {
        ...ROUTES.NOT_FOUND,
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active"
})

export default router