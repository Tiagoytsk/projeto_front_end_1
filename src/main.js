import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')