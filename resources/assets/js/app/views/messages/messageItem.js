var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});