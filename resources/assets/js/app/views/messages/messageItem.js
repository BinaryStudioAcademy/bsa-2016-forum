var Marionette = require('backbone.marionette');
var moment = require('moment-timezone');
var MessageDate = require('../../initializers/messageDateFormatting');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            updatedDate: MessageDate(moment.utc(this.model.get('updated_at')).tz('Europe/Kiev')),
            updatedStaticDate: moment.utc(this.model.get('updated_at')).tz('Europe/Kiev')
        }
    }
});