const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:4000",
  devServer: {
    port: 4000,
    client: {
      webSocketURL: {
        protocol: "ws",
        hostname: "localhost",
        port: 4000,
        pathname: "/ws",
      },
    },
  },
  chainWebpack: (config) => {
    if (config.plugins.has("SystemJSPublicPathWebpackPlugin")) {
      config.plugins.delete("SystemJSPublicPathWebpackPlugin");
    }
  }
})
