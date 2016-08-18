var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem',
    initialize: function(options) {
        this.currentUser = options.currentUser;
        this.withUser = options.withUser;
    },
    serializeData: function () {
        var direction = '';
        var with_user = {};
        if(this.model.get('user_from_id') == currentUser.get('id')) {
            with_user = this.currentUser.toJSON();
            direction = 'from';
        } else {
            with_user = this.withUser;
            direction = 'to';
        }

        return {
            model: this.model.toJSON(),
            messageDirection: direction,
            user: with_user
        }
    }
});