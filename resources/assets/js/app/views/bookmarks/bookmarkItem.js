var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'bookmarkItem',
    tagName: 'div',
    events: {
        'click .delete-button': 'delete'
    },

    serializeData: function () {
        var meta = this.model.getMeta();

        if (!meta) return {};

        var id = this.model.get('id');

        return {
            model: this.model.toJSON(),
            meta: {
                user: meta.user,
                likes: meta.likes,
                comments: meta.comments,
                tags: meta.tags
            }
        };
    },

    delete: function() {
        console.log(this);
        //this.model.destroy();
    }
});