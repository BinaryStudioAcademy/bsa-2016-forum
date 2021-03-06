var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentItem = require('./TopicCommentItem');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.CollectionView.extend({
    childView: CommentItem,
    tagName: 'ul',
    className: 'messages_layout comments_collection',

    childViewOptions: function() {
        return {
            parentCommentView: this.options.parentCommentView
        };
    }
});
