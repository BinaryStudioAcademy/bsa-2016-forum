var moment = require('moment-timezone');
var config = require('config');

var dateHelper = {
    dateWithTimezone: function(date) {
        return moment.utc(date).tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')
    },

    shortDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY')
    },

    middleDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm')
    },

    fullDate: function(date) {
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm:ss')
    },

    relativeDate: function (date) {
        //date = moment(date);

        var now = moment();
        var then = moment(date);
        // if message older than 12 hours
        if (((now - then) / 1000) > 43200) {
            return moment(date).format('DD.MM.YYYY HH:mm');
        }

        return moment(then, 'x').fromNow();
    }
};

module.exports = dateHelper;