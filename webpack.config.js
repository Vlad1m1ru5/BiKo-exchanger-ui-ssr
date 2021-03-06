const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDevMode = process.env.NODE_ENV

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: 'index.html'}
      ]
    },
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3030'
    }
  },
  devtool: isDevMode ? 'eval-source-map' : '',
  entry: {
    app: ["./src/client/index.tsx"],
    auth: ['./src/client/pages/auth.tsx'],
    feed: ['./src/client/pages/feed.tsx'],
    finder: ['./src/client/pages/finder.tsx'],
    login: ['./src/client/pages/login.tsx'],
    settings: ['./src/client/pages/settings.tsx'],
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
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              publicPath: '/assets'
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use : [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              publicPath: '/assets'
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use : [
          'style-loader',
          'css-loader'
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
    new CopyWebpackPlugin([
      {
        from: 'node_modules/pdfjs-dist/cmaps/',
        to: 'cmaps/'
      },
    ]),
    new HtmlWebpackPlugin({
      chunks: [
        'app',
        'auth',
        'feed',
        'finder',
        'login',
        'settings'
      ],
      template: './src/client/index.html',
    })
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, "src/api/"),
      assets: path.resolve(__dirname, "src/assets/"),
      client: path.resolve(__dirname, "src/client/"),
      middleware: path.resolve(__dirname, "src/middleware/"),
      routes: path.resolve(__dirname, "src/routes/"),
      static: path.resolve(__dirname, "src/static/"),
      store: path.resolve(__dirname, "src/store/"),
    },
    extensions: [".js", ".jsx", ".json", ".mjs", ".ts", ".tsx", ".wasm", "*"]
  }
};

module.exports = config;