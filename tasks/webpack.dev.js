const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../../origo/plugins'),
    publicPath: '/build/js',
    filename: 'fme.js',
    clean: true,
    library: {
      name: 'FME',
      type: 'var',
      export: 'default'
    }
  },
  mode: 'development',
  devServer: {
    static: './',
    port: 9008,
    devMiddleware: {
      writeToDisk: true
    }
  }
});
