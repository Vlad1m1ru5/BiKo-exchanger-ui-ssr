const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    vendor: [
      "@babel/polyfill",
      "react"
    ],
    app: [
      "./src/client/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[contenthash].js"
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
};

module.exports = config;