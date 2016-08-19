var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName: 'div',
    className: 'vote-head',
    modelEvents: {
        'change': 'render'
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var meta = {
            user: {},
            likes: {},
            comments: {},
            tags: {}
        };
        if (tempmeta) {
            var id = this.model.get('id');
            meta = {
                user: tempmeta.user[id],
                likes: tempmeta.likes[id],
                comments: tempmeta.comments[id],
                tags: tempmeta.tags[id]
            }
        }

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});