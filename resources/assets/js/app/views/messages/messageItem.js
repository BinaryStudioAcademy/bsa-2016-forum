var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var helper = require('../../helpers/helper');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        meta = this.model.getMeta();
        return {
            message: helper.formatText(this.model.get('message')),
            user: this.options.user,
            model : this.model.toJSON(),
            isUserFrom: this.options.isUserFrom,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});