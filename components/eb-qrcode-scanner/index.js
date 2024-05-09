import EbQrcodeScanner from './src/EbQrcodeScanner.vue'

EbQrcodeScanner.install = function (Vue) {
  Vue.component(EbQrcodeScanner.name, EbQrcodeScanner)
}

export default EbQrcodeScanner
