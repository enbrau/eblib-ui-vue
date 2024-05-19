import EbTableCmpt from './src/EbTable.vue'
import EbTableColumnCmpt from './src/EbTableColumn.vue'

EbTableCmpt.install =  function (Vue) {
  Vue.component(EbTableCmpt.name, EbTableCmpt)
}

EbTableColumnCmpt.install = function (Vue) {
  Vue.component(EbTableColumnCmpt.name, EbTableColumnCmpt)
}

export const EbTable = EbTableCmpt
export const EbTableColumn = EbTableColumnCmpt
