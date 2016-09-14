var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var helper = require('../../helpers/helper');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: helper.formatText(this.model.get('message')),
            userTo: this.options.userTo,
            userFrom: this.options.userFrom,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});