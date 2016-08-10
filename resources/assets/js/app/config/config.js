var debug = require('./debug/config');
var prod = require('./prod/config');

var config = {
  env: null,

  setEnv: function (env) {
    this.env = env;
  },

  getEnv: function () {
    return this.env;
  },

  getConfig: function () {

    return this.env === 'debug' ? debug : prod;
  }
};

module.exports = config;