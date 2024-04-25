import { createApp } from 'vue'
import EbDemo from '../../components/eb-demo'
import App from './App.vue'

createApp(App)
  .use(EbDemo)
  .mount('#app')
