var appInstance = require('./appInstance');
var config = require('../config/common');

module.exports = function () {
    if (config.debug) {
        if (console.log) {
            console.log.apply(console, arguments);
        }
    }

};