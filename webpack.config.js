const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    // vendor: [
    //   "@babel/polyfill",
    //   "react",
    //   "react-dom",
    //   "react-redux",
    //   "redux",
    //   "styled-components"
    // ],
    app: [
      "./src/client/biko/index.tsx"
    ]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
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
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    alias: {
      client: path.resolve(__dirname, "src/client/"),
      routes: path.resolve(__dirname, "src/routes/"),
      static: path.resolve(__dirname, "src/static/"),
      store: path.resolve(__dirname, "src/store/"),
    },
    extensions: [".js", ".jsx", ".json", ".mjs", ".ts", ".tsx", ".wasm", "*"]
  }
};

module.exports = config;