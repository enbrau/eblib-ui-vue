import { defineClientConfig } from 'vuepress/client'

import EbLibUI from '../../../components/index.js'

export default defineClientConfig({
  async enhance({ app }) {
    if (!__VUEPRESS_SSR__) {
      const EbLibUI = await import('../../../components/index.js')
      app.use(EbLibUI.default)
    } else {
      app.use(EbLibUI)
    }
  },
  setup() {},
  rootComponents: [],
})