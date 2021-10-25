const HtmlWebpackPlugin = require('html-webpack-plugin')
const OnBuildWebpack = require('on-build-webpack')

const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))

const production = Boolean(argv.production)
const bypass = Boolean(argv.bypass)
const development = Boolean(argv.development)
const staging = Boolean(argv.staging)
const minify = Boolean(argv.p)

// API service links
const DEV_SERVICE_URL = 'http://localhost:8000/api'
const PROD_SERVICE_URL = 'https://api.textbookexchangenetwork.com/api'
const STAGING_SERVICE_URL = 'https://ten-api-service-staging.herokuapp.com/api'

// universal auth links
const DEV_AUTH = 'http://localhost:8002/authService'
const PROD_AUTH = 'https://auth.textbookexchangenetwork.com/authService'
const STAGING_AUTH =
  'https://ten-auth-service-staging.herokuapp.com/authService'

// SSO Login Page Link
const DEV_LOGIN = 'http://localhost:3003/login'
const PROD_LOGIN = 'login.textbookexchangenetwork.com/login'
const STAGING_LOGIN = 'http://ten-login-frontend-staging.herokuapp.com/login'

const AUTH_URL = production ? PROD_AUTH : staging ? STAGING_AUTH : DEV_AUTH
const SERVICE_URL = production
  ? PROD_SERVICE_URL
  : staging
  ? STAGING_SERVICE_URL
  : DEV_SERVICE_URL
const LOGIN_URL = production ? PROD_LOGIN : staging ? STAGING_LOGIN : DEV_LOGIN

const NODE_ENV = production ? 'production' : staging ? 'staging' : 'development'
const BYPASS_LOGIN_USER_PAGES = bypass

const isJs = (name) => name.match(/^.+\.js$/)

module.exports = {
  mode: minify ? 'production' : 'development',
  watchOptions: {
    poll: true,
    ignored: './node_modules/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './www/'),
    port: '3000',
    hot: true,
    historyApiFallback: true,
    proxy: {
     '/**': {
       target: 'http://localhost:8000',
       secure: false,
       changeOrigin: true
     }
   }
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './www'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loaders: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),

    new webpack.DefinePlugin({
      'process.env.AUTH_URL': JSON.stringify(AUTH_URL),
      'process.env.SERVICE_URL': JSON.stringify(SERVICE_URL),
      'process.env.LOGIN_URL': JSON.stringify(LOGIN_URL),
      'process.env.BYPASS_LOGIN_USER_PAGES': JSON.stringify(
        BYPASS_LOGIN_USER_PAGES
      ),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
}
