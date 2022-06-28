import { createPinia } from 'pinia'
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// ----------------CSS--------------- //

import 'bulma/css/bulma.css'
import '@/assets/main.scss'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

library.add(fas,far,fab)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(naive)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
