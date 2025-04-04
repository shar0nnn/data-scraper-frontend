import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/css/nucleo-icons.css"
import "./assets/css/nucleo-svg.css"
import ArgonDashboard from "./argon-dashboard"
import {createPinia} from "pinia"
import store from "@/store"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(store)
app.use(router)
app.use(ArgonDashboard)
app.mount("#app")
