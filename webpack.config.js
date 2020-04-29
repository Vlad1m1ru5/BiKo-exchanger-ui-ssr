const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3030'
    }
  },
  devtool: 'eval-source-map',
  entry: {
    app: ["./src/client/index.tsx"]
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
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      },
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0
    },
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: './src/client/index.html',
    })
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