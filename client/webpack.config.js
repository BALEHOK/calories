const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devEnv = 'development';
const env = process.env.NODE_ENV || devEnv;
const constants = require('./env/' + env);

const devtool = env === devEnv ? 'source-map' : 'nosources-source-map';

module.exports = {
  target: 'web',
  devtool: devtool,
  stats: {
    colors: true,
    reasons: false
  },
  entry: {
    main: ['babel-polyfill', './app/index.jsx']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin(constants),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'app']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options:
          {
            presets: ['react', 'es2015', 'stage-0'],
            babelrc: false
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(png|svg|jpg|gif|ico|json)$/,
        use: [
          'file-loader?name=[name].[ext]'
        ]
      },
      {
        test: /sw\.js$/,
        use: [
          'file-loader?name=sw.js'
        ]
      }
    ],
    noParse: /\.min\.js/
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    port: 3000
  }
};
