const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/app/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/static')
  },
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
      __SERVER__: false
    })
  ]
};
