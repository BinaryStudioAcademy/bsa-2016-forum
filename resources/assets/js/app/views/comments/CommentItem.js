var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicDetailCommentItem',

    initialize: function(options) {
        this.model.set('comment_url', this.model.collection.getEntityUrl() + '/' + this.model.get('id'));
    },

    onRender: function () {

    }

});