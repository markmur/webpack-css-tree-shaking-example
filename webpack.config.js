/* eslint-env node */
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const entry = filename => [path.resolve(__dirname, filename)]

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: [require('cssnano')()],
  }
}

module.exports = {
  mode: 'production',

  entry: entry('src/index.js'),

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
      },
    ],
  },
  plugins: [
    // Extract all css into a separate file
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new PurgecssPlugin({
      paths: glob.sync('src/**/*', { nodir: true })
    })
  ],
}
