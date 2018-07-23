const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        // force this loader to run first if it's not first in loaders list
        // enforce: 'pre',
        // avoid running prettier on all the files!
        // use it only on your source code and not on dependencies!
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'prettier-loader',
        // force this loader to run first if it's not first in loaders list
        // enforce: 'pre',
        // avoid running prettier on all the files!
        // use it only on your source code and not on dependencies!
        exclude: /node_modules/
      },
      {
        test: /(\.css$)/,
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
