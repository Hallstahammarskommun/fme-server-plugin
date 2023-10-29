const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../../fme-server-plugin'),
  entry: './fme.js',
  externals: ['Origo'],
  resolve: {
    extensions: ['*', '.js']
  }
};
