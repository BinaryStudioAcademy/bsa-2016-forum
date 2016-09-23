var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var helper = require('../../helpers/helper');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    tagName: 'li',
    attributes: function () {
        return {
            class: this.options.isUserFrom ? 'from_user left' : 'by_myself right'
        }
    },
    serializeData: function () {
        meta = this.model.getMeta();
        return {
            message: helper.formatText(this.model.get('message')),
            user: this.options.user,
            model : this.model.toJSON(),
            isUserFrom: !this.options.isUserFrom,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});