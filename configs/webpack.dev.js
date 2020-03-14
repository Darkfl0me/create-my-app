const common = require('./webpack.common');
const merge = require('webpack-merge');
const { resolve } = require('path')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, '../dist/'),
    port: 4000,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index.tsx'
  ]
})