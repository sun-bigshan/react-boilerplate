const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

process.env.BABEL_ENV = 'node';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/app/index.js'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist/server')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_PROD__: isProd,
      __SERVER__: true
    })
  ],
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      '@dist': path.resolve(__dirname, '../dist')
    }
  }
};
