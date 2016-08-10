var appInstance = require('./appInstance');

var Logger = function (message) {

  if (appInstance.getInstance().config.debug) {
    console.log(message);
  }

};

module.exports = Logger;