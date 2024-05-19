const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {extensions: [".ts", ".tsx", ".js", ".json"]},
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
      ],
      plugins: [
        new webpack.DefinePlugin({
          '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
        }),
      ]
    }
  }
})
