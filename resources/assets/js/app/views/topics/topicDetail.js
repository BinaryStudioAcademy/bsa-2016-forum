var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.LayoutView.extend({

    template: 'topicDetail',

    initialize: function(options) {

    },

    modelEvents: {
        //'change': 'render'
    },

    collectionEvents: {
        'add': 'render'
    },

    ui: {
        'answer': '.topic-answer-btn',
        'share': '.topic-share-btn',
        'notification': '.topic-notification-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('newComment').trigger('showCommentForm', this);
        }
    },

    regions: {
        //'topic': '.topic-head',
        'commentsContainer': '.topic-comments',
        'newComment': '.topic-new-comment-container'
    },

    onBeforeShow: function () {
        this.getRegion('commentsContainer').show(new CommentsCollectionView({
          collection: this.collection
        }));
    },

    onRender: function () {

    }
});