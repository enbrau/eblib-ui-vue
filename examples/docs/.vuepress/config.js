import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

import { searchProPlugin } from "vuepress-plugin-search-pro"

import pkg from '../../../package.json'

export default defineUserConfig({
  base: '/doc/eblib-ui-vue/',
  title: pkg.name,
  description: pkg.description,
  lang: 'zh-CN',
  markdown: {
    lineNumbers: true
  },
  dest: '../doc/eblib-ui-vue',
  bundler: viteBundler(),
  theme: defaultTheme(),
  plugins: [
    searchProPlugin({})
  ]
})
