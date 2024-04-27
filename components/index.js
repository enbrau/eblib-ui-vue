import eblib from '@eblib/core'

import '../theme/index.scss'

import EbButton from './eb-button'
import EbExample from './eb-example'

const components = { EbButton, EbExample }

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
  Object.keys(eblib).forEach((key) => {
    Vue.config.globalProperties['$' + key] = eblib[key]
  })
}

export default { install }
