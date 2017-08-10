let HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './demo',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      ["create-foolish-container"]: path.join(__dirname, 'src/createFoolishContainer.js')
    }
  },
  devtool: 'sourcemap',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'React Counter Container'
    })
  ]
};
