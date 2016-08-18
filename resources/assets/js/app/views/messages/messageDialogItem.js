var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem',
    serializeData: function () {
        var direction = '';
        var with_user = {};
        if(this.model.get('user_from_id') == this.options.currentUser.get('id')) {
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