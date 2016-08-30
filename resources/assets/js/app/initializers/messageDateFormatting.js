var moment = require('moment-timezone');

module.exports = function MessageDate(date) {
    var now = moment();
    var then = date;

    if (((now - then) / 1000) > 43200) {
        return date.format('DD.MM.YYYY HH:mm');
    }

    return date.fromNow();
};
