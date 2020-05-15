const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const buildPath = './src/public/';
const htmlTemplate = './templates/index.html';

export default {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    './src/front/index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, buildPath),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        exclude: /node-modules/,
        test: /\.ts|tsx$/,
        use: 'ts-loader',
      },
      {
        test: /.scss$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[local]--[hash:base64:5]' },
              localsConvention: 'camelCase',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    quiet: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@front': path.resolve(__dirname, './src/front/'),
      '@server': path.resolve(__dirname, './src/server'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({ template: htmlTemplate }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
