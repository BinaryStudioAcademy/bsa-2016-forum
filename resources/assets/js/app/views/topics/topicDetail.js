var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var CommentsCollectionView = require('../comments/TopicCommentsCollection');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');
var TopicHeaderView = require('./topicHeader');

module.exports = Marionette.LayoutView.extend({
    template: 'topicDetail',
    _isTopicView: true,

    initialize: function () {
        this.childCommentsCollection = this.getOption('collection');
    },

    regions: {
        'newComment': '.newcomment',
        'topicHeader': '.topic-head',
        'comments': '.topic-comments'
    },

    ui: {
        'share': '.topic-share-btn',
        'notification': '.topic-notification-btn',
        'topic_delete': '.topic-delete-btn',
        'answer': '.topic-answer-btn'
    },

    events: {
        'click @ui.answer': function (event) {
            Radio.channel('comment').trigger('addComment', this, null, this.childCommentsCollection);
        },
        'click @ui.topic_delete': function (event) {
            this.model.destroy();
            this.$('#delete-topic-form').remove();
            Backbone.history.navigate('topics', {trigger: true});
        }
    },

    onRender: function () {
        this.getRegion('topicHeader').show(new TopicHeaderView({
            model: this.model
        }));

        this.getRegion('comments').show(new CommentsCollectionView({
            collection: this.collection,
            reorderOnSort: true
        }));
    }

});