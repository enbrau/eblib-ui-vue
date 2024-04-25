import EbDemo from './demo'
const components = { EbDemo }

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

export default { install }
