const path = require('path');
const ROOT = path.resolve(__dirname);
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV

const entry = {
  background: [
    ROOT + '/src/background',
  ],
  content_script: [
    ROOT + '/src/content_script/index',
  ],
  'options/index': [
    ROOT + '/src/options/index',
  ],
  'popup/index': [
    ROOT + '/src/popup/index',
  ]
}

module.exports = {
  entry: entry,
  mode: env,
  output: {
    path: ROOT + '/chrome',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map.js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts[x]?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        include: ROOT + '/src',
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': ROOT + '/src',
    },
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/manifest.json',
        to: './'
      },
      {
        from: 'src/assets',
        to: './assets'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      template: 'src/popup/index.html',
      inject: true,
      chunks: ['popup/index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'options/index.html',
      template: 'src/options/index.html',
      inject: true,
      chunks: ['options/index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
  ]
}
