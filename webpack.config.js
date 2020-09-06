const webpack = require('webpack');
const path = require("path");
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ],
  },
  output: {
    filename: "script.user.js",
    path: path.resolve(__dirname, 'out'),
  },
  resolve: {
    extensions: ['.ts', '.js',],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `// ==UserScript==
      // @name         esa.io copy menu
      // @namespace    https://github.com/fushihara/esa-io-copy-menu
      // @match        https://*.esa.io/posts/*
      // @description  gist.githubのタイトルやURL単独コピー機能を追加
      // @version      ${process.env.npm_package_version}
      // @grant        none
      // @license      MIT
      // @source       https://github.com/fushihara/esa-io-copy-menu
      // @homepage     https://greasyfork.org/ja/scripts/410893-esa-io-copy-menu
      // @noframes
      // ==/UserScript==`.split("\n").map(a => a.trim()).join("\n"),
      raw: true,
    })
  ]
};