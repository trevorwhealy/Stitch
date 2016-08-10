const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  context: path.join(__dirname, './client'),
  entry: [
    'webpack-hot-middleware/client',
    './index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot',
      },
      {
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
        },
      },
    ],
  },
};
