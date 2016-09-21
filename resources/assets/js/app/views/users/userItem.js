var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'userItem',
    tagName: 'li',

    serializeData: function () {
        urlBaseAvatar = this.model.collection.getMeta();
        return {
            meta: urlBaseAvatar,
            model: this.model.toJSON()
        };
    }
});
