var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            message: this.model.toJSON(),
            user: this.options.user,
            user_name: this.options.user.first_name + " " + this.options.user.last_name
        }
    }
});