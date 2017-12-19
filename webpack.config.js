const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        bundle: "./public/javascripts/main.js",
        // server: "./server/main.js"
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
    },

    // entry: [/*"./bin/www"*/'./app.js'/*, './public/javascript/kanaban/main.js'*/],
    // output: {
        // __dirname : 현재 실행중인 스크립트가 있는 디렉터리 이름을 포함하는 node.js 전역 변수
        // path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/',
        // filename: 'bundle.js'
    // },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, './'),
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['env', 'react']
                }
            }
        ]
    }
};