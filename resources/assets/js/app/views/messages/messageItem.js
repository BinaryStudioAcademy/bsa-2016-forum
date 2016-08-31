var Marionette = require('backbone.marionette');
var moment = require('moment-timezone');
var MessageDate = require('../../initializers/messageDateFormatting');
var config = require('config');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            updatedDate: MessageDate(moment.utc(this.model.get('updated_at')).tz(config.timeZone)),
            updatedStaticDate: moment.utc(this.model.get('updated_at')).tz(config.timeZone)
        }
    }
});