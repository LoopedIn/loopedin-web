"use strict";

const ExtractPlugin = require("extract-text-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "eval",
  entry: `${__dirname}/src/main.js`,
  output: {
    filename: "bundle-[hash].js",
    path: `${__dirname}/build`,
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLPlugin({
      template: "public/index.html"
    }),
    new ExtractPlugin("bundle-[hash].css")
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000"
      }
    ]
  }
};
