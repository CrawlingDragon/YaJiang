module.exports = {
  transpileDependencies: ["vue-meta"],
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: "~@/common/css/base.styl"
      }
    }
  },
  publicPath: "./",
  filenameHashing: true,
  configureWebpack: {
    externals: {
      BMapGL: "BMapGL"
    }
  },
  devServer: {
    hot: true,
    port: 8082,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
// http://beta.sx.114nz.com/
