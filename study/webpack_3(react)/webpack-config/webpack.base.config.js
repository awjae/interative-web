const path = require("path");
// const autoprefixer = require("autoprefixer");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/index.jsx") // 직접 코드 수정하는 부분
  },
  output: {
    path: path.resolve(__dirname, "../dist"), //output으로 나올 파일이 저장될 경로
    filename: "bundle.js",
    chunkFilename: "[name].js",
    publicPath: "../dist"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          },
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "../dist/bundle.css",
    //   chunkFilename: "[name].css",
    //   ignoreOrder: true
    // })
  ],
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "../src")],
    extensions: [
    //   ".ts",
    //   ".tsx",
      ".js",
      ".jsx",
    //   ".json",
    //   ".css",
    //   ".scss",
    //   ".svg"
      ".ttf",
    ]
  }
};