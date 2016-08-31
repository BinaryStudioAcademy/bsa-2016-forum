var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteItem',
    className: 'row post-item',
    tagName: 'div',
    serializeData: function () {
        var tempmeta = this.model.getMeta();
        console.log(tempmeta);
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: tempmeta[id].user,
                likes: tempmeta[id].likes,
                comments: tempmeta[id].comments,
                tags: tempmeta[id].tags,
                days_ago:tempmeta[id].days_ago
            }
        };
    }
});