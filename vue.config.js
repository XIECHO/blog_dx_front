const path = require("path");
module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/css/main.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      "/blogapi": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          //   "^/api": ""
        }
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(path.resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
