import EbDemo from "./src/main.vue"

EbDemo.install = function (Vue) {
  Vue.component(EbDemo.name, EbDemo)
}

export default EbDemo
