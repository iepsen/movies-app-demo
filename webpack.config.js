/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        include: path.resolve(__dirname, './src'),
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [new HtmlWebPackPlugin({
    template: 'public/index.html'
  })],
  devServer: {
    host: '0.0.0.0'
  }
}
