const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.214.242.226:9091/',// 后端接口
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
})



