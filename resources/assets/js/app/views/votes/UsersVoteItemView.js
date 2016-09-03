var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    className: 'row post-item',
    tagName: 'div',
    serializeData: function () {
        var meta = this.model.getMeta();
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user,
                likes: meta[id].likes,
                comments: meta[id].comments,
                tags: meta[id].tags,
                days_ago:meta[id].days_ago
            }
        };
    }
});