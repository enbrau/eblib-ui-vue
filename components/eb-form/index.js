import EbFormCmpt from "./src/EbForm.vue"
import EbFormItemCmpt from "./src/EbFormItem.vue"

EbFormCmpt.install = function (Vue) {
  Vue.component(EbFormCmpt.name, EbFormCmpt)
}

EbFormItemCmpt.install = function (Vue) {
  Vue.component(EbFormItemCmpt.name, EbFormItemCmpt)
}

export const EbForm = EbFormCmpt
export const EbFormItem = EbFormItemCmpt
