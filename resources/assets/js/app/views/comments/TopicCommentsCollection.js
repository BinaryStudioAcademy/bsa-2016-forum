var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentItem = require('./TopicCommentItem');

module.exports = Marionette.CollectionView.extend({
    childView: CommentItem,

    events: {

    },



    onRender: function () {

    }
});
