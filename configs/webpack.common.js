const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const ForkTsCheckerWebpackPugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: resolve(__dirname, '../tsconfig.json') })],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss']
  },
  context: resolve(__dirname, '../'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // disable type checker - use fork-ts plugin
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.(scss|sass)$/,
        loader: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', 
            options: { 
              importLoaders: 1,
              modules: true
            } 
          },
          'sass-loader'
        ]
      }, 
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new ForkTsCheckerWebpackPugin({ 
      eslint: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
}