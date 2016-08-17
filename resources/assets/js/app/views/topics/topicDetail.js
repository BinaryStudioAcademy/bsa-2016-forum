var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var CommentsCollection = require('../../collections/TopicCommentsCollection');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var _ = require('underscore');
var logger = require('../../instances/logger');
var NewTopicCommentView = require('../comments/TopicCommentNew');
var Radio = require('backbone.radio');

module.exports = Marionette.LayoutView.extend({

    template: 'topicDetail',

    ui: {
        'answer': '.topic-control-btn .answer-btn',
        'share': '.topic-control-btn .share-btn',
        'notification': '.topic-control-btn .notification-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('newComment').trigger('showCommentForm', this);
        }
    },

    regions: {
        'commentsContainer': '.topic-comments',
        'newComment': '.new-comment-container'
    },

    initialize: function(options) {

    },

    newCommentForm: function (parentView) {
        parentView.getRegion('newComment').show(new NewTopicCommentView());
    },

    onRender: function () {
        // fetch and show comments collection after topic layout is rendered
        var collection = new CommentsCollection();
        collection.parentUrl = _.result(this.model, 'url');

        collection.fetch({ success: function() {},
            error: function (response) {
                console.error(response.responseText);
            }
        });

        this.getRegion('commentsContainer').show(new CommentsCollectionView({
          collection: collection
        }))
    }
});