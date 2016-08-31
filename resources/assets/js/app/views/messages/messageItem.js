var Marionette = require('backbone.marionette');
var moment = require('moment-timezone');
var config = require('config');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            updatedDate: moment.utc(this.model.get('updated_at')).tz(config.timeZone).format('DD.MM.YYYY HH:mm')
        }
    }
});