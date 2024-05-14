import EbTable from './src/EbTable.vue'
import EbTableColumn from './src/EbTableColumn'

EbTable.install =  function (Vue) {
  Vue.component(EbTable.name, EbTable)
}

EbTableColumn.install = function (Vue) {
  Vue.component(EbTableColumn.name, EbTableColumn)
}

export { EbTable, EbTableColumn as default }
