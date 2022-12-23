import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './utilities/vuex'
const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(store)
app.use(router).mount('#app')