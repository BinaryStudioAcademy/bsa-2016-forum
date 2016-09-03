var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    serializeData: function () {
        var id = this.model.get('id');
        var meta = this.model.getMeta();

        if (!meta[id]) return {
            model: this.model.toJSON(),
            meta: {
                user: this.model.attributes.user
            }
        };

        return {
            model: this.model.toJSON(),
            meta: {
                user: meta[id].user
            }
        }
    }
});