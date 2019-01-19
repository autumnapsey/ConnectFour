const merge = require('webpack-merge');

const common = require('./config/webpack.config.common.js');
const development = require('./config/webpack.config.dev.js');
const production = require('./config/webpack.config.prod.js');

const configs = {
  [undefined]: development,
  development,
  production,
  local: development,
};

module.exports = merge(common, configs[process.env.NODE_ENV]);
