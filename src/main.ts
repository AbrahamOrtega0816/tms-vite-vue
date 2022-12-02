import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from "vue-query"
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import FlagIcon from 'vue-flag-icon';

// ----------------CSS--------------- //

import 'bulma/css/bulma.css'
import '@/assets/main.scss'
import 'vue-loading-overlay/dist/vue-loading.css';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin);
app.use(naive)

app.use(FlagIcon);

app.mount('#app')
