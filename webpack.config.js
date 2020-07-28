const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Typescript D3 Starter',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    "host": "0.0.0.0",
    "disableHostCheck": true
  }
};
