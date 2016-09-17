var moment = require('moment-timezone');
var config = require('config');
var _ = require('underscore');

var dateHelper = {
    dateWithTimezone: function(date) {
        if (_.isEmpty(date)) return '';
        return moment.utc(date).tz(config.timeZone).format('YYYY-MM-DD HH:mm:ss')
    },
    
    voteDateToSave: function (date) {
        if (_.isEmpty(date) || date == '0000-00-00 00:00:00' || date == '') return null;
        return moment(date).tz(config.timeZone).utc().format('YYYY-MM-DD HH:mm:ss');
    },

    dateWithTimezoneInFormat: function (date) {
        if (_.isEmpty(date) || date == '0000-00-00 00:00:00') return '';
        return moment.utc(date).tz(config.timeZone).format('YYYY-MM-DDTHH:mm:ss')
    },
    

    getDateTimeDiff: function (date) {
        if(_.isEmpty(date)) return false;
        return (moment.utc().diff(moment.utc(date), 'minute'));
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