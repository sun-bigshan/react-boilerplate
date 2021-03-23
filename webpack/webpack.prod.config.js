const path = require('path');
const webpack = require('webpack');
//提取 css  插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//生成 manifest 方便定位对应的资源文件
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
//压缩 js 代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//构建前清理目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//压缩和优化 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//路径转换
const resolvePath = pathstr => path.resolve(__dirname, pathstr);

process.env.BABEL_ENV = 'development'; //指定 babel 编译环境

module.exports = {
  mode: 'production',
  entry: {
    main: resolvePath('../src/client/app/index.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: resolvePath('../dist/static'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清理上一次构建的文件
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    //生成 manifest 方便定位对应的资源文件
    new WebpackManifestPlugin({
      fileName: '../server/asset-manifest.json'
    }),
    new webpack.DefinePlugin({
      __SERVER__: false,
      __IS_PROD__: true
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false
          }
        },
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs' // 打包后的文件名，任意命名
        }
      }
    }
  }
};
