import eblib from '@eblib/core'

import '../theme/index.scss'

import EbRow from './eb-row'
import EbCol from './eb-col'
import EbButton from './eb-button'
import EbExample from './eb-example'

import EbCamera from './eb-camera'

const components = { EbRow, EbCol, EbButton, EbExample, EbCamera }

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
  Object.keys(eblib).forEach((key) => {
    Vue.config.globalProperties['$' + key] = eblib[key]
  })
}

export default { install, ...components }
