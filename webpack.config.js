const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    app: [
      "./src/client/biko/index.tsx"
    ]
    //, vendor: [
    //   "@babel/polyfill",
    //   "react",
    //   "react-dom",
    //   "react-redux",
    //   "redux",
    //   "styled-components"
    // ]
  },
  devServer: {
    contentBase: "./public",
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3030'
    }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(ts|tsx)$/,
        use: [
          "babel-loader"
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     chunks: "all",
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

  //           return `npm.${packageName.replace("@", "")}`;
  //         },
  //       },
  //     },
  //   },
  // },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, "src/api/"),
      client: path.resolve(__dirname, "src/client/"),
      routes: path.resolve(__dirname, "src/routes/"),
      static: path.resolve(__dirname, "src/static/"),
      store: path.resolve(__dirname, "src/store/"),
    },
    extensions: [".js", ".jsx", ".json", ".mjs", ".ts", ".tsx", ".wasm", "*"]
  }
};

module.exports = config;