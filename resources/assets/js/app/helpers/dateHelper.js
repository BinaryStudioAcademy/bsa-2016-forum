var moment = require('moment-timezone');
var config = require('config');

var dateHelper = {
    shortDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY')
    },

    middleDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm')
    },

    fullDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm:ss')
    }
};

module.exports = dateHelper;