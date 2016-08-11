var appInstance = require('./appInstance');
var config = require('../config/config');

var Logger = function () {

  //console.log(config);

  if (config.debug) {

    if (window.console && console.log) {
      console.log.apply(this, arguments);
    }

  }

};

module.exports = Logger;