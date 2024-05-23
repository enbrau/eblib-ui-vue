import EbIcon from './src/main.vue'
import * as icons from './src/icons'

EbIcon.install = function (Vue) {
  Vue.component(EbIcon.name, EbIcon)
  for (const key in icons) {
    Vue.component(key, icons[key])
  }
}

export default EbIcon
export * from './src/icons'