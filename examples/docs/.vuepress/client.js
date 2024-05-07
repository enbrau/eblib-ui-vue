import { defineClientConfig } from 'vuepress/client'

import EbLibUI from '../../../components/index.js'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(EbLibUI)
  },
  setup() {},
  rootComponents: [],
})