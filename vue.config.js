const { defineConfig } = require('@vue/cli-service')
const { CustomStandaloneDisabledPlugin, GenerateImportMapPlugin } = require("@event-chat/micro-dev-config/plugins")

const ROOT_CONFIG_URL = process.env.VUE_APP_DEPLOY_BASE ?? '/micro-single-app-vue'
const isProduction = process.env.NODE_ENV === 'production';
const isStandalone = process.env.STANDALONE_SINGLE_SPA === 'true';

const displayStandalonePage = (prod) => `<main>
  <h1>Single-spa: React 子应用</h1>
  <p>当前微前端以"集成模式"运行，不独立提供页面。</p>
  <h2>访问链接</h2>
  <p>${
    prod
      ? '<a href="/micro-single-app-substrate/react/">/micro-single-app-substrate/react/</a>'
      : '<a href="http://localhost:9000/react">http://localhost:9000/react</a>'
  }</p>
  <h2>Standalone 模式</h2>
  <p>如果想独立运行本子应用：<code>npm run start:standalone</code></p>
</main>`

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: isProduction ? `${ROOT_CONFIG_URL}/` : '/',
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
    plugins: [
      new CustomStandaloneDisabledPlugin({
        handle: (html) => isStandalone || !html.includes('Your Microfrontend is not here') ? html : html.replace(
          /<main>[\s\S]*<\/main>/,
          displayStandalonePage(isProduction)
        )
      }),
      new GenerateImportMapPlugin({
        module: isProduction ? '@levi/vue-project' : ''
      })
    ]
  }
})
