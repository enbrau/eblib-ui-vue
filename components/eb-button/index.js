import EbButton from "./src/main.vue"

EbButton.install = function (Vue) {
  Vue.component(EbButton.name, EbButton)
}

export default EbButton
