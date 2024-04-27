import EbExample from "./src/main.vue"

EbExample.install = function (Vue) {
  Vue.component(EbExample.name, EbExample)
}

export default EbExample
