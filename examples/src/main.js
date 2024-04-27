import { createApp } from 'vue'
import EBLibUI from '../../components'
import App from './App.vue'

const app = createApp(App)
  .use(EBLibUI)
app.mount('#app')
