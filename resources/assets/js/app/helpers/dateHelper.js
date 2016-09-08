var moment = require('moment-timezone');
var config = require('config');
var _ = require('underscore');

var dateHelper = {
    dateWithTimezone: function(date) {
        if (_.isEmpty(date)) return '';
        return moment.utc(date).tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')
    },

    dateWithoutTimezone: function(date) {
        if (_.isEmpty(date)) return '';
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    
    getDateTimeDiff: function (date) {
        return moment().diff(this.dateWithoutTimezone(date), 'minute');
    },

    shortDate: function(date) {
        if (_.isEmpty(date)) return '';
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY')
    },

    middleDate: function(date) {
        if (_.isEmpty(date)) return '';
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm')
    },

    fullDate: function(date) {
        if (_.isEmpty(date)) return '';
        return moment.utc(date).tz(config.timeZone).format('DD.MM.YYYY HH:mm:ss')
    },

    relativeDate: function (date) {
        if (_.isEmpty(date)) return '';
        var now = moment();
        var then = moment(date);
        
        // if message older than 12 hours
        if (((now - then) / 1000) > 43200) {
            return moment(date).format('DD.MM.YYYY HH:mm');
        }

        return moment(then, 'x').fromNow();
    },

    isTimePassed: function (date, interval) {
        if (_.isEmpty(date)) {
            return false;
        }
        var now = moment.utc();
        var createdAt = moment.utc(date);
        return !((now - createdAt) <= interval);
    },

    minutesToMilliseconds: function (minutes) {
        return minutes * 60 * 1000;
    }
};

module.exports = dateHelper;