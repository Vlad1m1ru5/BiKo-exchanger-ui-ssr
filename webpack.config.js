const path = require("path");

const config = {
  entry: {
    vendor: [
      "@babel/polyfill",
      "react"
    ],
    app: [
      "./src/components/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
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
  }
};

module.exports = config;