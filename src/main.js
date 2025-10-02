import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import api from './plugins/axios'
import router from './router'
import './assets/tailwind.css'
import './assets/font.css'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router)
app.use(createPinia())

app.mount('#app')
