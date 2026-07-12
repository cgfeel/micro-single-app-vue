const { defineConfig } = require('@vue/cli-service')

// 自定义 standalone disabled 提示页内容
class CustomStandaloneDisabledPlugin {
  apply(compiler) {
    const isProd = compiler.options.mode === 'production'
    compiler.hooks.compilation.tap('CustomStandaloneDisabledPlugin', (compilation) => {
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'CustomStandaloneDisabledPlugin',
        (data, cb) => {
          // 仅当 standalone plugin 处于 disabled 状态时，替换默认提示页
          if (data.html.includes('Your Microfrontend is not here')) {
            data.html = data.html.replace(
              /<main>[\s\S]*<\/main>/,
              `<main>
                <h1>Single-spa: Vue 子应用</h1>
                <p>当前微前端以 "集成模式" 运行，不独立提供页面。</p>
                <h2>访问链接</h2>
                <p>${isProd ? '<a href="/micro-single-app-substrate/vue/">/micro-single-app-substrate/vue/</a>' : '<a href="http://localhost:9000/vue">http://localhost:9000/vue</a>'}</p>
                <h2>Standalone 模式</h2>
                <p>如果想独立运行本子应用：<code>npm run serve:standalone</code></p>
              </main>`
            )
          }
          cb(null, data)
        }
      )
    })
  }
}

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
  },
  configureWebpack: {
    plugins: [new CustomStandaloneDisabledPlugin()]
  }
})
