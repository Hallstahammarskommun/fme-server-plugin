const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  optimization: {
    nodeEnv: 'production',
    minimize: true
  },
  performance: {
    hints: false
  },
  output: {
    path: path.resolve(__dirname, '../build/js'),
    filename: 'fme.min.js',
    compareBeforeEmit: false,
    clean: true,
    library: {
      name: 'FME',
      type: 'var',
      export: 'default'
    }
  },
  devtool: false,
  mode: 'production'
});
