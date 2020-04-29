"use strict";

const webpack = require("webpack");
const dotenv = require("dotenv");
const ExtractPlugin = require("extract-text-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");

module.exports = env => {
  const currentPath = path.join(__dirname);
  //console.log("Environment: ", env.ENVIRONMENT);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  let envKeys = {};
  envKeys["process.env.API_URL"] = JSON.stringify(fileEnv["API_URL"]);

  return {
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
      new ExtractPlugin("bundle-[hash].css"),
      new webpack.DefinePlugin(envKeys)
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
};
