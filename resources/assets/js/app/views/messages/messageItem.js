var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            updatedDate: dateHelper.middleDate(this.model.get('updated_at'))
        }
    }
});