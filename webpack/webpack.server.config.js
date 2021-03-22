const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
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
      __SERVER__: true
    })
  ]
};
