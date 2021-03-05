const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require("./webpack.base.config");
const DotEnv = require("dotenv-webpack");

module.exports = env =>
  merge(baseConfig, {
    mode: "production",
    output: {
      publicPath: "../dist"
    },
    plugins: [
      new DotEnv({
        path: path.resolve(__dirname, "./local.env")
      })
    ],
    proxy: {
      "/api/vworld": {
        target: "http://api.vworld.kr/req/search",
        secure: false,
        changeOrigin: true
      } // 프록시
    },
  });
