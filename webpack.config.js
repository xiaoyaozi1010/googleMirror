
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
    devtool: 'inline-source-map',
    plugins: [
        new cleanPlugin(['extension/dist']),
    ]
}