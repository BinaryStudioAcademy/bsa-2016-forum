var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteAnswerItem',
    serializeData: function () {
        return {
            model: this.model.toJSON(),
            meta: this.model.getMeta()
        };
    }
});