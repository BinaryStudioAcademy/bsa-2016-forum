var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem',
    serializeData: function () {
        var direction = '';
        var with_user = {};
        if(this.model.get('user_from_id') == currentUser.get('id')) {
            with_user = this.options.currentUser.toJSON();
            direction = 'from';
        } else {
            with_user = this.options.withUser;
            direction = 'to';
        }

        return {
            model: this.model.toJSON(),
            messageDirection: direction,
            user: with_user
        }
    }
});