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
    path: `${__dirname}/../build/js`,
    filename: 'fme.min.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'FME'
  },
  devtool: false,
  mode: 'production'
});
