import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-material-design-icons/styles.css'
import './assets/styles/global.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('v-click-outside', (el) => {
  console.log(el)
})
app.mount('#app')
