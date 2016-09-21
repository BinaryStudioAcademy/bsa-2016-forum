var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'li',

    serializeData: function () {
        return {
            model: this.model.toJSON()
        };
    }
});
