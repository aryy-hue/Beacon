import './styles/tokens.css'
import './styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// Apply persisted theme (Vuetify + `.dark` token scope) on boot
const stored = localStorage.getItem('northwood_theme')
if (stored === 'schoolDark') {
  document.documentElement.classList.add('dark', 'beacon-dark')
}

app.mount('#app')
