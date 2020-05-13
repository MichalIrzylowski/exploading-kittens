const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const buildPath = './src/public/';
const htmlTemplate = './templates/index.html';

export default {
  entry: './src/front/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, buildPath),
  },
  module: {
    rules: [
      {
        exclude: /node-modules/,
        test: /\.ts|tsx$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { localsConvention: 'camelCaseOnly', modules: true },
          },
          'sass-loader',
          'typings-for-css-modules-loader',
        ],
      },
    ],
  },
  // devServer: {
  //   contentBase: buildPath,
  //   historyApiFallback: true,
  //   hot: true,
  //   overlay: true,
  //   quiet: true,
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@front': path.resolve(__dirname, './src/front/'),
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({ template: htmlTemplate }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
