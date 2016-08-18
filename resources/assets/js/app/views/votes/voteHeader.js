var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteHeader',
    tagName:'div',
    className: 'vote-head',
    modelEvents: {
        'change':'render'
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        if (tempmeta === undefined) return [];
        else {
            var id = this.model.get('id');
            return {
                model: this.model.toJSON(),
                meta: {
                    user: tempmeta.user[id],
                    likes: tempmeta.likes[id],
                    comments: tempmeta.comments[id],
                    tags: tempmeta.tags[id]
                }
            };
        }
    }
});