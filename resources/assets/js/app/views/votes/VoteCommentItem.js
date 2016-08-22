var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    serializeData: function () {
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            meta: {
                user: this.model.getMeta()[id].user
            }
        };
    }
});