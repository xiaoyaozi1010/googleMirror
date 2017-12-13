
const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: "./js/index.js",
        popup: './js/popup.js'
    },
    output: {
        path: path.resolve(__dirname, 'extension/dist'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'awesome-typescript-loader' }
        ]
    },
    plugins: [
        new cleanPlugin(['extension/dist']),
    ]
}