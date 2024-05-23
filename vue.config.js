const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {extensions: [".ts", ".tsx", ".js", ".json"]},
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
      ]
    }
  }
})
