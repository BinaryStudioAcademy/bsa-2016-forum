var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    serializeData: function () {
        var data = this.model.toJSON();
        data._meta = this.model._meta;

        return data;
    }
});