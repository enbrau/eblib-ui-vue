const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  // resolve problem: Cannot read properties of null (reading ‘isCE‘) at renderSlot
  configureWebpack: {
     resolve: {
       symlinks: false,
       alias: {
         vue: path.resolve("./node_modules/vue"),
       }
     }
   }
})
