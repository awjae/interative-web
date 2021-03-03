// const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin      = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin   = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const helpers = require('./helpers');
 
module.exports = {
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        //빌드 이전 결과물을 제거하는 플러그인
        new CleanWebpackPlugin({ 
            root: helpers.root(), 
            verbose: true 
        }),
        //따로 분리하여 번들한 css파일과 js파일을 각각 html 파일에 link 태그, script태그로 추가해줘야 한다. HtmlWebpackPlugin은 이것을 자동화 해준다.
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        //단순히 복사만 하면 되기 때문에
        // new CopyWebpackPlugin([
        //     { from: './src/assets/**', to: './assets', flatten: true },
        //     { from: './src/**', to: './', flatten: true }
        // ]),
    ]
};
