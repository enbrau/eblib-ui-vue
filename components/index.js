import '../theme/index.scss'

import EbButton from './eb-button'
import EbDemo from './eb-demo'

const components = { EbButton, EbDemo }

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

export default { install }
