import eblib from '@eblib/core'

import '../theme/index.scss'

import EbRow from './eb-row'
import EbCol from './eb-col'
import EbButton from './eb-button'
import EbExample from './eb-example'

import EbCamera from './eb-camera'
import EbCameraInvoker from './eb-camera-invoker'

const components = { 
  EbRow, EbCol, EbButton, EbExample, EbCamera, EbCameraInvoker 
}

export default {
  install: (Vue) => {
    if (this.installed) return
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    Object.keys(eblib).forEach((key) => {
      Vue.config.globalProperties['$' + key] = eblib[key]
    })
  }
}

export { 
  EbRow, EbCol, EbButton, EbExample, EbCamera, EbCameraInvoker
}

